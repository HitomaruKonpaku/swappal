var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var jSchema = new Schema(
    {
        author: String,
        title: String,
        content: String,
        imageUrl: String,
        createDate: Date,
    },
    {
        versionKey: false
    })

jSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('news', jSchema)