// params
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Promise = require('bluebird')
const nodemailer = require('nodemailer')
const util = require('util');
const async = require('promise-async')

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
    privateKey: require('fs').readFileSync('./_key/SSHPrivatekey2.ppk'),
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
const verificationLink = 'http://api.swappal.ml:3001/apis/accounts/verify/'
const resetPassTokenLength = 128
const passResetLink = 'http://api.swappal.ml:3001/apis/accounts/passwordreset/'
const loginTokenLength = 128

const msgMissingData = 'Missing data'

// import
let Account = require('../models/Account')
let AccountReg = require('../models/AccountReg')
let News = require('../models/News')
let Skill = require('../models/Skill')
let Request = require('../models/Request')
let SkillCat = require('../models/SkillCate')

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
        pass: 'qwertasdfgzxcvb12345'
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
//====================================================================================================
//====================================================================================================

function getTomorrow() {
    var d = new Date()
    d.setDate(d.getDate() + 1)
    return d
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
                        msg: 'Email đã tồn tại, xin chọn email khác'
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
                            var acc = data;
                            res.json({
                                msg: 'success',
                                data: token,
                                acc: acc,
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
                        msg: 'Email hoặc mật khẩu không đúng',
                        data: {
                            msg: 'Email hoặc mật khẩu không đúng'
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
        let email = req.body.email
        let name = req.body.name
        let dob = req.body.dob
        let gender = req.body.gender
        let mission = req.body.mission
        let location = req.body.location
        let phone = req.body.phone
        let exp = req.body.exp
        let achievement = req.body.achievement
        let facebook = req.body.facebook
        let description = req.body.description

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
                            dob: dob,
                            gender: gender,
                            mission: mission,
                            location: location,
                            phone: phone,
                            exp: exp,
                            achievement: achievement,
                            facebook: facebook,
                            description: description,
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
            .select({ 'email': 1, 'skills': 1 })
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

router.route('/accounts/list')
    .get((req, res) => {
        Account.find()
            .select('email createDate profile')
            .then((result) => {
                res.json({ result })
            })
    })

router.route('/accounts/ban')
    .post((req, res) => {
        let token = req.body.token
        let uid = req.body.uid
        let reason = req.body.reason

        Account.findOne({ '_id': uid })
            .then((result) => {
                if (!result) {
                    return
                }

                if (result.lockout) {
                    return
                }

                let date = new Date()
                let obj = {
                    date: date,
                    reason: reason,
                }

                result.lockout = obj
                result.save()
                    .then((acc) => {
                        responseSuccuess(res, '')
                    })
            })
    })

router.route('/accounts/unban')
    .post((req, res) => {
        let token = req.body.token
        let uid = req.body.uid

        Account.findOne({ '_id': uid })
            .then((result) => {
                if (!result) {
                    return
                }

                if (!result.lockout) {
                    return
                }

                result.lockout = undefined
                result.save()
                    .then((acc) => {
                        responseSuccuess(res, '')
                    })
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

router.route('/search')
    .post((req, res) => {
        let have = req.body.have || []
        let want = req.body.want || []
        let page = Number(req.body.page) || 1
        let limit = Number(req.body.limit) || 10

        let query = {}
        if (have && have.length > 0) query['skills.have'] = { $all: have }
        if (want && want.length > 0) query['skills.want'] = { $all: want }

        Account
            .paginate(query,
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
    })

router.route('/request/new')
    .post((req, res) => {
        let token = req.body.token
        let from = req.body.from
        let to = req.body.to
        let sfrom = req.body.sfrom
        let sto = req.body.sto
        let message = req.body.message

        async
            .parallel({
                acc1: (callback) => {
                    Account
                        .findOne({ 'email': from })
                        .select({ 'email': 1, 'skills': 1 })
                        .populate('skills.have')
                        .populate('skills.want')
                        .exec(callback)
                },
                acc2: (callback) => {
                    Account
                        .findOne({ 'email': to })
                        .select({ 'email': 1, 'skills': 1 })
                        .populate('skills.have')
                        .populate('skills.want')
                        .exec(callback)
                },
            })
            .then((result) => {
                // console.log(JSON.stringify(result, null, 3))

                let acc1 = result.acc1
                let acc2 = result.acc2
                let date = new Date()

                let request = new Request()
                request.accFrom.acc = acc1._id
                request.accFrom.skill = sfrom
                request.accTo.acc = acc2._id
                request.accTo.skill = sto
                request.createDate = date
                request.updateDate = date
                request.messages = []
                request.statusLog = []

                let msg = {}
                msg.sender = acc1._id
                msg.message = message
                msg.date = date
                request.messages.push(msg)

                // console.log(request)

                request.save()
                    .then((result) => {
                        // console.log(result)
                        responseSuccuess(res, result)
                    })
            })
    })

router.route('/request/reply')
    .post((req, res) => {
        let token = req.body.token
        let requestid = req.body.requestid
        let from = req.body.from
        let message = req.body.message

        Request.findOne({ '_id': requestid })
            .populate({ path: 'accFrom.acc', select: 'email' })
            .populate({ path: 'accTo.acc', select: 'email' })
            .then((result) => {
                // console.log(result)

                let date = new Date()
                let acc1 = result.accFrom.acc
                let acc2 = result.accTo.acc
                let id = from === acc1.email ? acc1._id : acc2._id

                let msg = {}
                msg.sender = id
                msg.message = message
                msg.date = new Date()

                result.updateDate = date
                result.messages.push(msg)
                result.save()
                    .then((result) => {
                        responseSuccuess(res, result)
                    })
            })
    })

router.route('/request/accept')
    .post((req, res) => {
        let token = req.body.token
        let requestid = req.body.requestid
        let from = req.body.from

        Request.findOne({ '_id': requestid })
            .populate({ path: 'accFrom.acc', select: 'email' })
            .populate({ path: 'accTo.acc', select: 'email' })
            .then((result) => {
                // console.log(result)

                let date = new Date()
                let acc1 = result.accFrom.acc
                let acc2 = result.accTo.acc

                result.updateDate = date

                if (from === acc1.email) {
                    if (!result.status.accept.from) {
                        result.status.accept.from = date
                    } else {
                        return
                    }
                } else if (from === acc2.email) {
                    if (!result.status.accept.to) {
                        result.status.accept.to = date
                    } else {
                        return
                    }
                } else {
                    return
                }

                result.save()
                    .then((data) => {
                        responseSuccuess(res, data)
                    })

            })
    })

router.route('/request/decline')
    .post((req, res) => {
        let token = req.body.token
        let requestid = req.body.requestid
        let from = req.body.from

        Request.findOne({ '_id': requestid })
            .populate({ path: 'accFrom.acc', select: 'email' })
            .populate({ path: 'accTo.acc', select: 'email' })
            .then((result) => {
                console.log(result)

                let date = new Date()
                let acc1 = result.accFrom.acc
                let acc2 = result.accTo.acc
                let acc

                result.updateDate = date

                if (from === acc1.email) {
                    acc = acc1
                } else if (from === acc2.email) {
                    acc = acc2
                } else {
                    // responseError(res, 'error')
                    // return
                }

                if (result.status.decline) {
                    // responseError(res, 'error')
                    // return
                }

                result.status.decline = {
                    by: acc._id,
                    date: date,
                }

                result.save()
                    .then((data) => {
                        responseSuccuess(res, data)
                    })
            })
    })

router.route('/request/complete')
    .post((req, res) => {
        let token = req.body.token
        let requestid = req.body.requestid
        let from = req.body.from

        Request.findOne({ '_id': requestid })
            .populate({ path: 'accFrom.acc', select: 'email' })
            .populate({ path: 'accTo.acc', select: 'email' })
            .then((result) => {
                // console.log(result)

                let date = new Date()
                let acc1 = result.accFrom.acc
                let acc2 = result.accTo.acc
                let acc

                result.updateDate = date

                if (from === acc1.email) {
                    acc = acc1
                } else if (from === acc2.email) {
                    acc = acc2
                } else {
                    return
                }

                if (!result.status.accept.from || !result.status.accept.to || result.status.decline) {
                    return
                }

                if (result.status.complete) {
                    return
                }

                result.status.complete.by = acc._id
                result.status.complete.date = date

                result.save()
                    .then((data) => {
                        responseSuccuess(res, data)
                    })
            })
    })

router.route('/request/list')
    .post((req, res) => {
        let email = req.body.email

        Request.find({})
            .populate({ path: 'accFrom.acc', select: 'email profile.name' })
            .populate({ path: 'accTo.acc', select: 'email profile.name' })
            .populate({ path: 'accFrom.skill' })
            .populate({ path: 'accTo.skill' })
            // .select({
            //     'accFrom': 1,
            //     'accTo': 1,
            //     'createDate': 1,
            //     'updateDate': 1,
            // })
            .exec()
            .then((result) => {
                let arr = result
                arr = arr.filter((item) => {
                    return item.accFrom.acc.email === email || item.accTo.acc.email === email
                })
                arr = arr.sort((a, b) => {
                    return b.updateDate - a.updateDate
                })
                responseSuccuess(res, arr)
            })
    })

router.route('/request/review')
    .post((req, res) => {
        let token = req.body.token
        let rid = req.body.requestid
        let email = req.body.email
        let review = req.body.review
        let ratingSkill = req.body.ratesk
        let ratingService = req.body.ratesv

        Request.findById(rid)
            .populate({
                path: 'accFrom.acc',
                select: 'email',
            })
            .populate({
                path: 'accTo.acc',
                select: 'email',
            })
            .select('accFrom accTo status updateDate')
            .then((request) => {
                if (!request ||
                    !request.status ||
                    !request.status.complete) {
                    return
                }

                // console.log(JSON.stringify(request, null, 2))

                let reviewObj = {
                    message: review,
                    rateSkill: ratingSkill,
                    rateService: ratingService,
                }

                let isFrom = email === request.accFrom.acc.email

                if (isFrom) {
                    request.reviews.from = reviewObj
                } else {
                    request.reviews.to = reviewObj
                }

                request.save()
                    .then((result) => {
                        responseSuccuess(res)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    })

//====================================================================================================
//====================================================================================================
//====================================================================================================

router.route('/skillcat/all')
    .get((req, res) => {
        SkillCat.find()
            .select('name')
            .then((cates) => {
                cates = cates.sort((a, b) => {
                    // if (a.name < b.name) return -1
                    // if (a.name > b.name) return 1
                    // return 0
                    return a.name.localeCompare(b.name)
                })
                responseSuccuess(res, cates)
            })
    })

router.route('/skillcat/all2')
    .get((req, res) => {
        SkillCat.find()
            // .select('name')
            .populate({ path: 'skills', select: 'name' })
            .then((cates) => {
                cates = cates.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
                responseSuccuess(res, cates)
            })
    })

router.route('/skillcat/add')
    .post((req, res) => {
        let name = req.body.name

        if (!name) {
            return
        }

        SkillCat.findOne({ 'name': name })
            .then((result) => {
                if (result) {
                    responseError(res)
                    return
                }

                let cat = new SkillCat({ name: name })
                cat.save()
                    .then((result) => {
                        responseSuccuess(res, cat)
                    })
            })
    })

router.route('/skillcat/edit')
    .post((req, res) => {
        let id = req.body.id
        let name = req.body.name

        SkillCat.findById(id)
            .then((cate) => {
                if (!cate) {
                    responseInvalid(res)
                    return
                }

                cate.name = name
                cate.save()
                    .then(() => {
                        responseSuccuess(res)
                    })
            })
    })

//====================================================================================================
//====================================================================================================
//====================================================================================================

router.route('/skill/all')
    .get((req, res) => {
        Skill.find()
            .then((result) => {
                responseSuccuess(res, result)
            })
    })

router.route('/skill/get')
    .get((req, res) => {
        let q = req.query
        let s = q.search || ''
        let p = q.page || 1
        let l = q.limit || 100

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

router.route('/skill/add')
    .post((req, res) => {
        let name = req.body.name
        let catid = req.body.catid

        if (!name || !catid) {
            res.json({
                msg: msgMissingData
            })
            return
        }

        async.parallel({
            cat: (callback) => {
                SkillCat.findById(catid)
                    .exec(callback)
            },
            skill: (callback) => {
                Skill.findOne({ 'name': name })
                    .exec(callback)
            },
        })
            .then((asyncResult) => {
                if (!asyncResult.cat || asyncResult.skill) {
                    responseError(res)
                    return
                }

                let skill = new Skill({ name: name })
                skill.save()
                    .then((newSkill) => {
                        asyncResult.cat.skills.push(newSkill._id)
                        asyncResult.cat.save()
                            .then(() => {
                                responseSuccuess(res)
                            })
                    })
            })
    })

router.route('/skill/edit')
    .post((req, res) => {
        let skillid = req.body.skillid
        let name = req.body.name
        let oldcatid = req.body.oldcatid
        let newcatid = req.body.newcatid

        if (!skillid || !name || !newcatid) {
            responseError(res)
            return
        }

        async.parallel({
            oldCat: (callback) => {
                if (!oldcatid) callback
                SkillCat.findById(oldcatid)
                    .exec(callback)
            },
            newCat: (callback) => {
                SkillCat.findById(newcatid)
                    .exec(callback)
            },
            skill: (callback) => {
                Skill.findById(skillid)
                    .exec(callback)
            },
            skillCheck: (callback) => {
                Skill.findOne({ 'name': name })
                    .exec(callback)
            },
        })
            .then((asyncResult) => {
                // console.log(asyncResult)

                if (!asyncResult.skill || !asyncResult.newCat) {
                    responseError(res)
                    return
                }

                if (asyncResult.skillCheck && asyncResult.skillCheck.name === name ||
                    asyncResult.oldCat && asyncResult.oldCat.skills.indexOf(skillid) === -1
                ) {
                    responseInvalid(res)
                    return
                }

                asyncResult.skill.name = name

                if (asyncResult.oldCat && asyncResult.oldCat._id !== asyncResult.newCat._id) {
                    let s = asyncResult.skill
                    let s1 = asyncResult.oldCat.skills
                    let s2 = asyncResult.newCat.skills

                    s1.splice(s1.indexOf(s._id), 1)
                    s2.push(s._id)

                    asyncResult.oldCat.skills = s1
                    asyncResult.newCat.skills = s2

                    async.parallel([
                        (callback) => { asyncResult.oldCat.save(callback) },
                        (callback) => { asyncResult.newCat.save(callback) },
                        (callback) => { asyncResult.skill.save(callback) },
                    ])
                        .then((asyncSave) => {
                            console.log(asyncSave)
                            responseSuccuess(res)
                        })
                } else if (!asyncResult.oldCat) {
                    asyncResult.newCat.skills.push(asyncResult.skill._id)

                    async.parallel([
                        (callback) => { asyncResult.newCat.save(callback) },
                        (callback) => { asyncResult.skill.save(callback) },
                    ])
                        .then((asyncSave) => {
                            console.log(asyncSave)
                            responseSuccuess(res)
                        })
                }
                else {
                    asyncResult.skill.save()
                        .then(() => {
                            responseSuccuess(res)
                        })
                }
            })
            .catch((err) => { console.log(err) })
    })

//====================================================================================================
//====================================================================================================
//====================================================================================================

    .get((req, res) => {
        let email = req.query.email

        Account.findOne({ 'email': email })
            .then((acc) => {
                if (!acc) {
                    responseError(res)
                    return
                }

                async.parallel([
                    (callback) => {
                        Request.find({
                            'accFrom.acc': acc._id,
                            'status.complete': { $exists: true, $ne: null },
                        })
                            .select('accFrom accTo')
                            .exec(callback)
                    },
                    (callback) => {
                        Request.find({
                            'accTo.acc': acc._id,
                            'status.complete': { $exists: true, $ne: null },
                        })
                            .exec(callback)
                    },
                ])
                    .then((asyncRes) => {
                        console.log(asyncRes)
                        let newArr = asyncRes[0].concat(asyncRes[1])



                        responseSuccuess(res, asyncRes)
                    })
            })
    })