import mongoose from "mongoose";
const Schema = mongoose.Schema({
username:{
    type:String,
    required:[true,"please provide a username"],
    unique:true,
},
email:{
    type:String,
    required:[true,"please provide a username"],
    unique:true,
},
password:{
    type:String,
    required:[true,"please provide a username"],
},
isverified:{
    type:Boolean,
    default:false
},
isAdmin:{
    type:Boolean,
    default:false
},
forgotPasswordToken:String,
forgotPasswordTokenExpired:Date,
verifyToken:String,
verifyTokenExpiry:Date
});
const user=mongoose.models.Users || mongoose.model("Users",Schema);
export default user;