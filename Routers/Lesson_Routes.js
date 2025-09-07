const express = require("express");
const { upload } = require("../Utiles/Multer");
const Lesson_Router = express.Router();
const { createLesson,GetLessons } = require("../Controllers/LessonControllers");
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
Lesson_Router.get("/all", TokenValidators,
  validateMiddleware,
  checkAuth,
GetLessons)
module.exports = { Lesson_Router };
