const express = require("express");
const { checkAuth, checkRole } = require("../Middlewares/authMiddleWare");
const {
  TokenValidators,
  validateMiddleware,
} = require("../Validators/authValidators.js");

const {
  getAvailableCourses,
  getCourseById,
  getMyEnrollments,
  getLessonsForCourse,
  getStudentProgress,
} = require("../Controllers/StudentController.js");

const Student_Router = express.Router();

// ✅ Get all available courses
Student_Router.get(
  "/courses",
  TokenValidators,
  validateMiddleware,
  checkAuth,
  checkRole("Student"),
  getAvailableCourses
);

// ✅ Get course details by ID
Student_Router.get(
  "/courses/:id",
  TokenValidators,
  validateMiddleware,
  checkAuth,
  checkRole("Student"),
  getCourseById
);

// ✅ Get student’s enrolled courses
Student_Router.get(
  "/my-enrollments",
  TokenValidators,
  validateMiddleware,
  checkAuth,
  checkRole("Student"),
  getMyEnrollments
);

// ✅ Get lessons of a course (only if enrolled)
Student_Router.get(
  "/courses/:courseId/lessons",
  TokenValidators,
  validateMiddleware,
  checkAuth,
  checkRole("Student"),
  getLessonsForCourse
);
// Student
Student_Router.get(
  "/courses/:courseId/progress",
  checkAuth,
  checkRole("Student"),
  getStudentProgress
);

module.exports = { Student_Router };
