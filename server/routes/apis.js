// params
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Promise = require('bluebird')
const nodemailer = require('nodemailer')
const util = require('util');

var fs = require("fs");
var tunnel = require('tunnel-ssh');

// connect
// mongoose.Promise = global.Promise
mongoose.Promise = Promise

var config = {
    host: '128.199.102.237',
    port: 22,
    // dstHost: 'mongodb://localhost:27017/swappal',
    dstPort: 27017,
    username: 'user',
    password: 'user',
    localHost: '127.0.0.1',
    localPort: 27017,
    agent: process.env.SSH_AUTH_SOCK,
    privateKey: require('fs').readFileSync('./.key/SSHPrivatekey2.ppk'),
};

var mongooseURI = 'mongodb://localhost:27017/swappal'

var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

var server = tunnel(config, function (error, server) {
    if (error) {
        console.log("SSH connection error: " + error);
        return
    }

    mongoose.connect(mongooseURI, options)
        .then(() => {
            console.log('MongoDB connection successful')
        })
        .catch((err) => {
            console.log('MongoDB connection error')
            console.log(err)
        })

});

//====================================================================================================
//====================================================================================================
//====================================================================================================

// const
const passHashKey = 'swappal'
const verificationTokenLength = 64
const verificationLink = 'http://localhost:3001/apis/accounts/verify/'
const resetPassTokenLength = 128
const passResetLink = 'http://localhost:3001/apis/accounts/passwordreset/'
const loginTokenLength = 128

const msgMissingData = 'Missing data'

// import
let Account = require('../models/Account')
let AccountReg = require('../models/AccountReg')
let News = require('../models/News')
let Skill = require('../models/Skill')

//====================================================================================================
//====================================================================================================
//====================================================================================================

router.use(function (req, res, next) {
    // console.log('Using APIs')
    next()
})

// export
module.exports = router

//====================================================================================================
//====================================================================================================
//====================================================================================================

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
//========== MAILER ==================================================================================
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
//========== RESPONSE DATA ===========================================================================
//====================================================================================================

function responseDefault(res, status, data) {
    res.json({
        msg: status,
        data: data
    })
}

function responseSuccuess(res, data) {
    responseDefault(res, 'success', data)
}

function responseFail(res, data) {
    responseDefault(res, 'fail', data)
}

function responseError(res, data) {
    responseDefault(res, 'error', data)
}

function responseInvalid(res, data) {
    responseDefault(res, 'invalid', data)
}

//====================================================================================================
//========== API - ACCOUNTS ==========================================================================
//====================================================================================================
// register
router.route('/accounts/reg')
    .post((req, res) => {
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
router.route('/accounts/verify/:key')
    .get((req, res) => {
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
router.route('/accounts/authenticate')
    .post((req, res) => {
        let email = req.body.email
        let pass = req.body.pwd

        if (!email || !pass) {
            res.json({
                msg: msgMissingData
            })
            return
        }

        console.log('Logging in as ' + email)

        Account.findOne({ 'email': email, 'passHash': hash(pass) }).exec()
            .then(data => {
                console.log(data)

                if (data) {
                    let token = {
                        token: tokenRandom(loginTokenLength),
                        createDate: new Date(),
                    }

                    data.tokens.push(token)

                    data.save()
                        .then(data => {
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
router.route('/accounts/passwordreset')
    .post((req, res) => {
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

// profile
router.route('/accounts/profile')
    .get((req, res) => {
        let email = req.query.email
        console.log(email)

        if (!email) {
            res.json({
                msg: msgMissingData
            })
            return
        }

        Account.findOne({ 'email': email })
            .select('profile')
            .exec()
            .then((data) => {
                console.log(data)
                if (data) {

                } else {

                }
                res.json({ data: data })
            })
            .catch((err) => {

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

router.route('/accounts/skills')
    .get((req, res) => {
        let email = req.query.email

        Account
            .findOne({ 'email': email })
            .select('skills')
            .populate('skills.have')
            .populate('skills.want')
            .exec()
            .then((data) => {
                console.log(data)
                responseSuccuess(res, data)
            })
    })
    .post((req, res) => {
        let email = req.body.email
        let have = req.body.have
        let want = req.body.want

        console.log(email)
        console.log(have)
        console.log(want)

        Account
            .findOne({ 'email': email })
            .exec()
            .then((result) => {
                if (!result) { }

                result.skills.have = have
                result.skills.want = want
                console.log(result)

                result
                    .save()
                    .then((result) => {
                        res.json(result)
                    })
            })

    })
//====================================================================================================
//====================================================================================================
//====================================================================================================

router.route('/skills')
    .get((req, res) => {
        let q = req.query

        let s = q.search || ''
        let p = q.page || 1
        let l = q.limit || 10

        Skill.paginate(
            {
                name: { $regex: "^" + s, $options: 'i' }
            },
            {
                lean: true,
                page: p,
                limit: l
            })
            .then((data) => {
                responseSuccuess(res, data)
            })
            .catch((err) => {
                responseError(res, err)
            })
    })
    .post((req, res) => {
        let name = req.body.name

        if (!name) {
            res.json({
                msg: msgMissingData
            })
            return
        }

        Skill.findOne({ 'name': name }).exec()
            .then((data) => {
                if (!data) {
                    let s = new Skill({
                        name: name
                    })

                    s.save()
                        .then((data) => {
                            responseSuccuess(res, data)
                        })
                        .catch((err) => {
                            responseError(res, err)
                        })
                } else {
                    responseInvalid(res, { msg: 'duplicate' })
                }
            })
            .catch((err) => {
                responseError(res, err)
            })


    })

//====================================================================================================
//====================================================================================================
//====================================================================================================

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

//====================================================================================================
//====================================================================================================
//====================================================================================================

function getTomorrow() {
    var d = new Date()
    d.setDate(d.getDate() + 1)
    return d
}

//====================================================================================================
//====================================================================================================
//====================================================================================================

router.route('/test')
    .get((req, res) => {
        let m = 'ct95server@gmail.com'
        let s = '58ca44aa71afe424d8694002'

        Account.findOne({ 'email': m })
            // .select('skills')
            .exec()
            .then((data) => {
                let acc = data
                console.log(acc)
                console.log(acc.skills.have)

                Skill.findOne({ '_id': s }).exec()
                    .then((data) => {
                        let skl = data
                        acc.skills.have.push(skl)

                        acc.save()
                            .then((data) => {
                                responseSuccuess(res, data)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
            })
    })


router.route('/search')
    .post((req, res) => {
        let have = req.body.have || []
        let want = req.body.want || []
        let page = Number(req.body.page) || 1
        let limit = Number(req.body.limit) || 10

        console.log('--------------------HAVE')
        console.log(have)
        console.log('--------------------WANT')
        console.log(want)
        console.log('--------------------')

        Account
            .paginate({
                $and: [
                    { 'skills.have': { $all: have } },
                    { 'skills.want': { $all: want } },
                ]
            },
            {
                select: {
                    'email': 1,
                    'profile': 1,
                    'skills': 1,
                },
                sort: {},
                populate: [
                    'skills.have',
                    'skills.want',
                ],
                // lean: false,
                // leanWithId: true,
                page: page,
                limit: limit,
            })
            .then((result) => {
                res.json({ result })
            })
        // .find({
        //     $and: [
        //         { 'skills.have': { $all: have } },
        //         { 'skills.want': { $all: want } },
        //     ]
        // })
        // .select({
        //     'email': 1,
        //     'profile': 1,
        //     'skills': 1,
        // })
        // .populate([
        //     'skills.have',
        //     'skills.want',
        // ])
        // .exec()

    })