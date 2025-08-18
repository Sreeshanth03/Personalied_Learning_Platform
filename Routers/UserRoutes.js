const express = require("express");
const router1 = express.Router();
const { authoriazation } = require("../Middlewares/Authorization.js");
const { profile } = require("../Controllers/profile.js");
const { upload } = require("../Utiles/Multer.js");
const {
  TokenValidators,
  editProfileVadilitor,
} = require("../Validators/authValidators.js");
const { editProfile } = require("../Controllers/Editprofile.js");

//api
router1.get("/profile", TokenValidators, authoriazation, profile);
router1.put(
  "/editProfile",
  upload.single("profilepic"),
  authoriazation,
  editProfileVadilitor,
  editProfile
);
module.exports = { router1 };
