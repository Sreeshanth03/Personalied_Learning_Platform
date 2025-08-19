const { body, validationResult, header } = require("express-validator");
const SignValidator = [
  body("name").optional().isString().trim().withMessage("Required Name"),
  body("username")
    .optional()
    .isString()
    .trim()
    .withMessage("Required UserName"),
    body("email").optional().withMessage("Email is Required"),
  body("password")
    .optional()
    .isString()
    .trim()
    .withMessage("Required Password"),
  body("role").isString().trim().withMessage("Role is req"),
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
  // body("name")
  //   .isLength({ min: 2, max: 12 })
  //   .isString()
  //   .trim()
  //   .withMessage("Name Required"),
  body("email")
    .isLength({ min: 2, max: 89 })
    .isString()
    .trim()
    .withMessage("Email Required"),
  body("password").isString().trim().withMessage("Required Password"),
  body("role").isString().trim().withMessage("Role is req"),
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
