const { Schema, model } = require("mongoose");

const BlogSchema = new Schema({
    user:{
        type : Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },content:{
        type:String,
        required:true
    }
    ,
    img_url:{
        type:String,
    
    },
    

},{timestamps:true,date: new Date("yyyy-MM-dd")});
module.exports = model('blog',BlogSchema);