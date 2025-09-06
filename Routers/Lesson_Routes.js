const express = require("express");
const { upload } = require("../Utiles/Multer");
const Lesson_Router = express.Router();
const { createLesson } = require("../Controllers/LessonControllers");
const {
  TokenValidators,
  validateMiddleware,
} = require("../Validators/authValidators");
const { checkAuth, checkRole } = require("../Middlewares/authMiddleWare");
Lesson_Router.post(
  "/",
  TokenValidators,
  validateMiddleware,
  checkAuth,
  checkRole("Instructor"),
  upload.single("content"),
  createLesson
);
module.exports = { Lesson_Router };
