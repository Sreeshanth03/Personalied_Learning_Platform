const express = require("express");
const router = express.Router();
const { Signin, Login } = require("../Controllers/authControllers.js");
const {
  SignValidator,
  LoginValidator,
} = require("../Validators/authValidators.js");

router.post("/signin", SignValidator, LoginValidator, Signin);
router.post("/login", LoginValidator, Login);

module.exports = { router };
