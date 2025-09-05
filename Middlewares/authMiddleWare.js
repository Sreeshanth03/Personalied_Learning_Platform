const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { UserModel } = require("../Models/Models.js");
dotenv.config();
// adding authentcaion
async function checkAuth(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(400).json({ message: "Authorization header missing" });
    } else {
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "Token Invalid" });
      } else {
        return jwt.verify(token, process.env.sercet_key, (err, decode) => {
          if (err) {
            return res.status(400).json({ message: "Check the token" });
          } else {
            req.user = decode;

            next();
          }
        });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid" });
  }
}

//---------------------------------Authorization code--------------------------------------

const checkRole = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const data = await UserModel.findById(user.id).select("role");
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }

      if (roles.includes(data.role)) {
        return next();
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
    } catch (err) {
      next(err);
    }
  };
};
module.exports = { checkAuth, checkRole };
