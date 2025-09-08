const express = require("express");
const Enroll_Routes = express.Router();
const {Courses_router}=require("../Routers/Courses_Router");
const {checkRole,checkAuth}=require("../Middlewares/authMiddleWare")
const {enrollStudent,getEnrolledStudents}=require("../Controllers/EnrollmentsControllers")
const {
  TokenValidators,
  validateMiddleware,
} = require("../Validators/authValidators");
Courses_router.post(
  "/:courseId/enroll",
  TokenValidators,
  validateMiddleware,
  checkAuth,
  checkRole("Student"),
  enrollStudent
);

Courses_router.get(
  "/:courseId/enrollments",
  TokenValidators,
  validateMiddleware,
  checkAuth,
  checkRole("Instructor"),
  getEnrolledStudents
);
module.exports = { Enroll_Routes };
