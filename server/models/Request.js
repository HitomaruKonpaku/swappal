var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var jSchema = new Schema(
    {
        _from: {
            acc: { type: Schema.Types.ObjectId, ref: 'accounts' },
            skill: { type: Schema.Types.ObjectId, ref: 'skills' },
        },
        _to: {
            acc: { type: Schema.Types.ObjectId, ref: 'accounts' },
            skill: { type: Schema.Types.ObjectId, ref: 'skills' },
        },
        createDate: Date,
        status: {
            code: Number,
            date1: Date,
            date2: Date,
        },
        messages: [{
            sender: { type: Schema.Types.ObjectId, ref: 'accounts' },
            message: String,
            date: Date,
        }],
    },
    {
        versionKey: false,
    })

jSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('requests', jSchema)