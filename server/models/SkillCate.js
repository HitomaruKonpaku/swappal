var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema

var jSchema = new Schema(
    {
        name: String,
        skills: [{ type: Schema.Types.ObjectId, ref: 'skills' }],
    },
    {
        versionKey: false
    })

jSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('skillcategories', jSchema)