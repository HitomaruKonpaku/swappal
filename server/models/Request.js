var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var jSchema = new Schema(
    {
        accFrom: {
            acc: { type: Schema.Types.ObjectId, ref: 'accounts' },
            skill: { type: Schema.Types.ObjectId, ref: 'skills' },
        },
        accTo: {
            acc: { type: Schema.Types.ObjectId, ref: 'accounts' },
            skill: { type: Schema.Types.ObjectId, ref: 'skills' },
        },
        createDate: Date,
        updateDate: Date,
        messages: [{
            sender: { type: Schema.Types.ObjectId, ref: 'accounts' },
            message: String,
            date: Date,
        }],
        status: {
            accept: {
                from: Date,
                to: Date,
            },
            decline: {
                by: { type: Schema.Types.ObjectId, ref: 'accounts' },
                date: Date,
            },
            complete: {
                by: { type: Schema.Types.ObjectId, ref: 'accounts' },
                date: Date,
            }
        },
    },
    {
        versionKey: false,
    })

jSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('requests', jSchema)