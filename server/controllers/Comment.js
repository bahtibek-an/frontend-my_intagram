const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment:{
        type:String
    },
    user:{type:mongoose.Types.ObjectId,ref:'User',required:true}
})
const commentModel = mongoose.model('Comment',CommentSchema)


module.exports = {
    commentModel
}