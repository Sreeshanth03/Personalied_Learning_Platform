const mongoose=require("mongoose");
const Enroll_Schema=mongoose.Schema({
    student:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    course:{type:mongoose.Schema.Types.ObjectId,ref:"Course"},
    enrolledAt:{type:Date,default:Date.now}
})
const Enroll_Model=mongoose.model("Enrollment",Enroll_Schema);
module.exports={Enroll_Model}