const express=require('express');
const Student=express.Router();
const {ViewDetails,updateDetails, AddComment,ViewComment}=require("../Controllers/StudentController.js")
Student.get("/ViewDetails",ViewDetails)
Student.put("/updateRes/:id",updateDetails)
Student.post("/AddComment/:id",AddComment)
Student.get("/viewComment/:id",ViewComment)


module.exports={Student}