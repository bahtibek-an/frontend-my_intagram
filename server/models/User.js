const  mongoose  = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        unique:true
    },
    bio:{
        type:String,
        default:""
    },
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    avatar:{
        img:{
            name:String,
            data:Buffer, 
        }

    },
})
const UserModel = mongoose.model('User',UserSchema)

module.exports = {
    UserModel
}