const { body, validationResult, header } = require("express-validator");
const SignValidator = [
body("name").isString().trim().withMessage("Name is required"),
body("username").isString().trim().withMessage("Username is required"),
body("email").isEmail().withMessage("Email is required"),
body("password").isString().trim().withMessage("Password is required"),
body("role").isString().trim().withMessage("Role is required"),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const err = {
        message: "Validation Signin Error",
        statusCode: 400,
      };
      next(err);
    }
    next();
  },
];
const LoginValidator = [

  body("email").isEmail().isLength({ min: 2, max: 89 }).trim().withMessage("Email Required"),
  body("password").isString().trim().withMessage("Required Password"),
  body("role").isString().optional().trim().withMessage("Role is req"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const err = {
        message: "Validation Login  Error",
        statusCode: 400,
      };
      next(err);
    }

    next();
  },
];
const TokenValidators = [
  header("authorization").isString().withMessage("Required Invalid Token"),
];
const editProfileVadilitor = [
  body("name")
    .isLength({ min: 2, max: 12 })
    .isString()
    .trim()
    .withMessage("Name Required"),
  body("email")
    .isLength({ min: 2, max: 89 })
    .isString()
    .trim()
    .withMessage("Email Required"),
  body("password").isString().trim().withMessage("Password Required"),
];
module.exports = {
  SignValidator,
  LoginValidator,
  TokenValidators,
  editProfileVadilitor,
};
