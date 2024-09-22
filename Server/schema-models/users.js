import mongoose from "mongoose";

const usersSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    
},{timestamps:true})

const users =mongoose.model("users",usersSchema)
export {users}