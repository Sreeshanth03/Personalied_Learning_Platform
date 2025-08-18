const bcrypt = require("bcryptjs");
const { UserModel } = require("../Models/Models.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
async function Signin(req, res) {
  try {
    const { name, username, email, password, role } = req.body;
    const hashpassword = await bcrypt.hash(password, 12);
    const user = new UserModel({
      name: name,
      username: username,
      email: email,
      password: hashpassword,
      role: role,
    });
    await user.save();
    console.log("Data sent successfully");
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
//Login
async function Login(req, res, next) {
  try {
    const { username, password } = req.body;
    const db_user_details = await UserModel.findOne({ username:username });
    // .select["-password"]  --> we can use these to exclude
    if (!db_user_details) {
      res.status(400).send("Details Required");
    } else {
      const isMatch = await bcrypt.compare(password, db_user_details.password);
      if (!isMatch) {
        res.status(400).send("Password Not Matched");
      } else {
        const token = jwt.sign(
          {
            id: db_user_details._id,
            username: db_user_details.username,
            role: db_user_details.role,
          },
          process.env.sercet_key,
          { algorithm: "HS256", expiresIn: "24h" }
        );
        res.status(200).json({
          name: db_user_details.username,
          role: db_user_details.role,
          accesstoken: token,
        });
      }
    }
  } catch (error) {
    const err = { statusCode: 400, message: error };
    next(err);
  }
}

module.exports = { Signin, Login };
