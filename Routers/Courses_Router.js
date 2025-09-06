const express = require("express");
const { upload } = require("../Utiles/Multer");
const { enrollStudent, getEnrolledStudents } = require("../Controllers/EnrollmentsControllers");
const {
  createCourses,
  GetAllCourses,
  GetById,
} = require("../Controllers/CoursesControllers");
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
Courses_router.get(
  "/all",
  TokenValidators,
  validateMiddleware,
  checkAuth,
  checkRole("Instructor"),
  GetAllCourses
);
Courses_router.get(
  "/all/:id",
  TokenValidators,
  validateMiddleware,
  checkAuth,
  checkRole("Instructor"),
  GetById
);

Courses_router.post(
  "/:courseId/enroll",
  TokenValidators,
  checkRole("Student"),
  enrollStudent
);

// Instructor - get enrollments API
Courses_router.get(
  "/:courseId/enrollments",
  TokenValidators,
  checkRole("Instructor"),
  getEnrolledStudents
);

module.exports = { Courses_router };
