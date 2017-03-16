var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var jSchema = new Schema(
    {
        name: String,
        description: String,
    },
    {
        versionKey: false
    })

jSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('skills', jSchema)