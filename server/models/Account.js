var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var jSchema = new Schema(
    {
        email: String,
        passHash: String,
        createDate: Date,
        verifyKey: String,
        verifyDate: Date,
        reset: {
            key: String,
            createDate: Date,
            expiryDate: Date,
            resetDate: Date,
        },
        tokens: [{
            token: String,
            createDate: Date,
            expiryDate: Date,
        }],
        profile: {
            name: String,
            nickname: String,
            dob: String,
            gender: String,
            mission: String,
            location: String,
            phone: String,
            exp: String,
            qoute: String,
            achievement: String,
            facebook: String,
        },
        skills: {
            have: Array,
            want: Array,
            detail: String,
        },
    },
    {
        versionKey: false
    })

jSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('accounts', jSchema)
