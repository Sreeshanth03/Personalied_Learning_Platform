const express = require("express");
const { upload } = require("../Utiles/Multer");
const { createCourses } = require("../Controllers/CoursesControllers");
const { checkAuth, checkRole } = require("../Middlewares/authMiddleWare");
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
