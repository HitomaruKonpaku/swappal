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
            dob: Date,
            gender: String,
            mission: String,
            location: String,
            phone: String,
            exp: String,
            achievement: String,
            facebook: String,
        },
        skills: {
            have: [{ type: Schema.Types.ObjectId, ref: 'skills' }],
            want: [{ type: Schema.Types.ObjectId, ref: 'skills' }],
        },
        lockout: {

        },
    },
    {
        versionKey: false
    })

jSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('accounts', jSchema)