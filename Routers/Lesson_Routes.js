const express=require('express');
const Lesson_Router=express.Router();
const {createLesson}=require("../Controllers/LessonControllers")
const {TokenValidators,validateMiddleware}=require("../Validators/authValidators")
const {checkAuth,checkRole}=require("../Middlewares/authMiddleWare")
Lesson_Router.post("/",TokenValidators,validateMiddleware,checkAuth,checkRole("Instructor"),createLesson)
module.exports={Lesson_Router}