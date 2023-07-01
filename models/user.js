import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
        unique:true,
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    password:{
       type:String,
       required:true,
       select:false// whenever we call user.password , this password will never come because select = false
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export const User = mongoose.model("User",schema)