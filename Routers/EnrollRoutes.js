const express=require("express");
const Enroll_Routes=express.Router();
const {TokenValidators,validateMiddleware}=require("../Validators/authValidators")
Courses_router.post("/:courseId/enroll", TokenValidators,validateMiddleware, checkRole("Student"), enrollStudent);

Courses_router.get("/:courseId/enrollments", TokenValidators,validateMiddleware, checkRole("Instructor"), getEnrolledStudents);
