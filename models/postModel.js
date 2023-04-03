const mongoose = require('../export-lib/libraries').mongoose

const postSchema = new mongoose.Schema({
    author:String,
    location:String,
    description:String,
    image:String
},{
    timestamps:true
})

module.exports =new mongoose.model('users' , postSchema)