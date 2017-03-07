// params
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Promise = require('bluebird')
const nodemailer = require('nodemailer')
const util = require('util');

// const
const mongodbUri = 'mongodb://localhost:27017/SwappalDB'
const passHashKey = 'swappal'
const verificationTokenLength = 64
const verificationLink = 'http://localhost:3002/apis/accounts/verify/'
const resetPassTokenLength = 128
const passResetLink = 'http://localhost:3002/apis/accounts/passwordreset/'
const loginTokenLength = 128

const msgMissingData = 'Missing data'

// connect
// mongoose.Promise = global.Promise
mongoose.Promise = Promise
mongoose.connect(mongodbUri)

// import
let Account = require('../models/Account')
let AccountReg = require('../models/AccountReg')
let News = require('../models/News')

// export
module.exports = router

// 
let tokenRandom = function (length) {
    var crypto = require('crypto')
    var token = crypto.randomBytes(length).toString('hex')
    return token
}

let hash = function (content) {
    const crypto = require('crypto')
    const hash = crypto.createHmac('sha256', passHashKey)
        .update(content)
        .digest('hex')
    return hash
}

//====================================================================================================
//====================================================================================================

// create reusable transporter object using the default SMTP transport
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ct95server@gmail.com',
        pass: 'chanh1412'
    }
})

// setup email data
let mailOptions = {
    from: '"SWAPPAL - Do Not Reply" <ct95server@gmail.com>',
}

let mailOptionsVerify = function (email, link) {
    let mailOps = mailOptions
    mailOps.to = email
    mailOps.subject = 'Verify your account'
    let html = util.format('<p>Please verify your account by clicking <a target="_blank" href="%s">this link</a><p>', link);
    mailOps.html = html
    return mailOps
}

let mailOptionsVerifyComplete = function (email) {
    let mailOps = mailOptions
    mailOps.to = email
    mailOps.subject = 'Your account have been verified'
    mailOps.html = 'Welcome to Swappal'
    return mailOps
}

let mailOptionsPassReset = function (email, link) {
    let mailOps = mailOptions
    mailOps.to = email
    mailOps.subject = 'Reset password'
    let html = util.format('<p><a target="_blank" href="%s">Click here</a> to reset password<p>', link);
    mailOps.html = html
    return mailOps
}

//====================================================================================================
//====================================================================================================

router.use(function (req, res, next) {
    // console.log('Using APIs')
    next()
})

//====================================================================================================
//====================================================================================================

router.route('/').get((req, res) => {
    res.send('Welcome to APIs')
})

// register
router.route('/accounts/reg').post((req, res) => {
    let eml = req.body.email
    let pwd = req.body.pwd

    if (!eml || !pwd) {
        res.json({
            msg: msgMissingData
        })
        return
    }

    let acc = new AccountReg({
        email: eml,
        pass: pwd,
    })

    // 
    let validErr = acc.validateSync()
    if (validErr) {
        res.json({
            msg: 'invalid',
            data: validErr
        })
        return
    }

    Account.findOne({ 'email': acc.email }).exec()
        .then(function (doc) {
            if (doc) {
                res.json({
                    // msg: 'You have already signed up and verified your account.'
                    msg: 'You have already signed up.'
                })
            } else {
                acc = new Account({
                    email: eml,
                    passHash: hash(pwd),
                    createDate: new Date(),
                    verifyKey: tokenRandom(verificationTokenLength),
                })

                acc.save()
                    .then(function () {
                        let link = verificationLink + acc.verifyKey

                        mailTransporter.sendMail(mailOptionsVerify(acc.email, link))
                            .then(function (doc) {
                                res.json({
                                    msg: 'success',
                                    data: {
                                        msg: 'An email has been sent to you. Please check it to verify your account.',
                                        info: doc,
                                    },
                                })
                            })
                            .catch(function (err) {
                                console.log(err)
                                res.json({
                                    msg: 'success',
                                    data: {
                                        msg: 'Failed to send verify email. Please try to resend it.',
                                    },
                                })
                            })
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }
        })
        .catch(function (err) {
            console.log(err)
        })
})

// verify account
router.route('/accounts/verify/:key').get((req, res) => {
    let key = req.params.key

    if (!key) {
        res.json({
            msg: msgMissingData
        })
        return
    }

    Account.findOne({ 'verifyKey': key }).exec()
        .then(function (doc) {
            if (doc) {
                let acc = doc
                acc.verifyDate = new Date()
                acc.verifyKey = undefined

                acc.save()
                    .then(function () {
                        mailTransporter.sendMail(mailOptionsVerifyComplete(acc.email))

                        res.json({
                            msg: 'You have verified your account!',
                        })
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            } else {
                res.json({
                    msg: 'Invalid link'
                })
            }
        })
        .catch(function (err) {
            console.log(err)
        })
})

// login  
router.route('/accounts/authenticate').post((req, res) => {
    let mail = req.body.email
    let pass = req.body.pwd

    if (!mail || !pass) {
        res.json({
            msg: msgMissingData
        })
        return
    }

    console.log('Logging in as %s', email)

    Account.findOne({ 'email': mail, 'passHash': hash(pass) }).exec()
        .then(data => {
            console.log(data)
            consoleSeperator()
            if (data) {
                let token = {
                    token: tokenRandom(loginTokenLength),
                    createDate: new Date(),
                }

                data.tokens.push(token)

                data.save()
                    .then(data => {
                        console.log(data)
                        consoleSeperator()
                        console.log(token)
                        consoleSeperator()

                        res.json({
                            msg: 'success',
                            data: token,
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.json({
                            msg: 'error',
                        })
                    })
            } else {
                res.json({
                    msg: 'error',
                    data: {
                        msg: 'Invalid Email or Password'
                    }
                })
            }
        })
})

// send reset pass
router.route('/accounts/passwordreset').post((req, res) => {
    let eml = req.body.email

    if (!eml) {
        res.json({
            msg: msgMissingData
        })
        return
    }

    Account.findOne({ 'email': eml }).exec()
        .then(function (doc) {
            let acc = doc
            if (acc) {
                let key = tokenRandom(resetPassTokenLength)
                acc.update({
                    'reset': {
                        key: key,
                        createDate: new Date(),
                        expiryDate: getTomorrow(),
                    }
                })
                    .then(function () {
                        let link = passResetLink + key;
                        mailTransporter.sendMail(mailOptionsPassReset(eml, link))
                            .then(function (doc) {
                                res.json({
                                    msg: 'Password reset email sent',
                                    info: doc,
                                })
                            })
                            .catch(function (err) {
                                res.json({
                                    msg: 'Fail to send password reset email'
                                })
                                console.log(err)
                            })
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            } else {
                res.json({
                    msg: 'Email not found'
                })
            }
        })
        .catch(function (err) {
            console.log(err)
        })
})

// reset pass 
router.route('/accounts/passwordreset/:key')
    .get((req, res) => {
        let key = req.params.key

        if (!key) {
            res.json({
                msg: msgMissingData
            })
            return
        }

        Account.findOne({ 'reset.key': key }).exec()
            .then(function (data) {
                if (data) {
                    res.json({
                        msg: true
                    })
                } else {
                    res.json({
                        msg: false
                    })
                }
            })
            .catch()
    })
    .post((req, res) => {
        let key = req.params.key
        let newPass = req.body.pwd

        if (!key || !newPass) {
            res.json({
                msg: msgMissingData
            })
            return
        }

        Account.findOne({ 'reset.key': key }).exec()
            .then(function (data) {
                let acc = data
                let currentTime = new Date()
                if (acc && new Date() <= acc.reset.expiryDate) {
                    acc.passHash = hash(newPass)
                    acc.reset.key = undefined
                    acc.resetDate = new Date()
                    acc.save()
                        .then(function (data) {

                        })
                        .catch(function (err) {
                            console.log(err)
                        })
                } else {
                    res.json({
                        msg: 'Invalid data'
                    })
                }
            })
            .catch(function (err) {
                console.log(err)
            })
    })

//====================================================================================================
//====================================================================================================

// news

router.route('/news')
    .post((req, res) => {
        let title = req.body.title
        let content = req.body.content

        if (!title || !content) {
            res.json({
                msg: msgMissingData
            })
        }

        let news = new News({
            title: title,
            content: content,
            createDate: new Date(),
        })

        news.save()
            .then(function () {
                res.json({
                    msg: 'Success'
                })
            })
            .catch(function (err) {
                console.log(err)
            })

    })
    .get((req, res) => {
        let page = req.query.page || 1
        let limit = req.query.limit || 5

        News.paginate({}, {
            sort: { 'createDate': -1 },
            lean: true,
            page: page,
            limit: limit
        })
            .then((data) => {
                res.json({
                    msg: 'Sucess',
                    data: data
                })
            })
    })

router.route('/news/dumb')
    .get((req, res) => {
        console.log('news dumping')

        var http = require('http');

        //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
        var options = {
            host: 'vnexpress.net',
            path: '/rss/the-gioi.rss'
        };

        callback = function (response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                console.log(str);
            });

            res.json({
                msg: 'done'
            })
        }

        http.request(options, callback).end();


    })
//====================================================================================================
//====================================================================================================

router.route('/accounts/profile')
    .get((req, res) => {
        res.json({
            header: '',
            body: '',
        })
    })
    .post((req, res) => {
        let header = req.header
        let body = req.body
        let email = body.email
        let name = body.name
        let dob = body.dob
        let gender = body.gender
        let mission = body.mission
        let location = body.location
        let phone = body.phone
        let exp = body.exp
        let achievement = body.achievement
        let facebook = body.facebook

        if (!email) {
            res.json({
                msg: msgMissingData
            })
            return
        }

        Account.findOne({ 'email': email })
            .then(data => {
                if (data) {
                    data.update({
                        'profile': {
                            name: name,
                            dob: body.dob,
                            gender: gender,
                            mission: mission,
                            location: location,
                            phone: phone,
                            exp: exp,
                            achievement: achievement,
                            facebook: facebook,
                        }
                    })
                        .then(data => {
                            res.json({
                                msg: 'success',
                                data: data,
                            })
                        })
                        .catch()
                } else {
                    res.json({
                        msg: 'not found'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.json({
                    msg: 'error'
                })
            })
    })

router.route('/acc/test')
    .get((req, res) => {
        console.log(req.query)
        res.json({
            data: req.query
        })
    })




//====================================================================================================
//====================================================================================================


function getTomorrow() {
    var d = new Date()
    d.setDate(d.getDate() + 1)
    return d
}

//====================================================================================================
//====================================================================================================


router.route('/accounts/reg/test').get((req, res) => {
    var acc = new Acc({
        email: 'ct95server@gmail.com',
    })

    acc.save()

    console.log(acc)

    res.status(404).send('Page Not Found')
})

function consoleSeperator() {
    console.log('==================================================')
    console.log('==================================================')
}

