// const express=require("express");
// const Courses_router=express.Router();
// const {upload}=require("../Utiles/Multer")
// const {createCourses,getCoursesById}=require("../Controllers/CoursesControllers")
// Courses_router.post("/",upload.single("Viedos"),createCourses);
// Courses_router.get("/:id",getCoursesById);
// module.exports={Courses_router}
const express = require("express");
const { upload } = require("../Utiles/Multer");
const { createCourses } = require("../Controllers/CoursesControllers");
const {checkAuth,checkRole}=require("../Middlewares/authMiddleWare")
const {
  TokenValidators,
  validateMiddleware,
} = require("../Validators/authValidators");
const Courses_router = express.Router();

Courses_router.post(
  "/",
  TokenValidators,
  validateMiddleware,
  checkAuth,
  checkRole("Instructor"),
  upload.single("viedo"),
  createCourses
);

module.exports = { Courses_router };
