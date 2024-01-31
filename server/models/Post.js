const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title:{
        type:String
    },
    img:{
        type:String
    },
    comments:[
        {     
            type:mongoose.Types.ObjectId,
            ref:'Comment'
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
    like:[
        
            {
                type:mongoose.Types.ObjectId,
                ref:'User'
            } 


    ],
    liked:{
        default:"false",
        type:String
    },
})
const postModel = mongoose.model('Post',PostSchema);

module.exports = {
    postModel
}