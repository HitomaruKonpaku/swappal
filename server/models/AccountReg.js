var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var jSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email required'],
            validate: {
                validator: function (v) {
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
                },
                message: 'Email format invalid',
            },
        },
        pass: {
            type: String,
            required: true,
            minlength: [3, 'Password minlength = 3'],
            maxlength: [64, 'Password maxlength = 64'],
        },
    },
    {
        versionKey: false
    })

module.exports = mongoose.model('accountreg', jSchema)