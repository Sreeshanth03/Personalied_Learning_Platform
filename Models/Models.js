const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  username: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  role: { type: String, enum: ["Admin", "Student", "Instructor"] },
  profilepic: { type: String },
});
const UserModel = mongoose.model("Users", UserSchema);
module.exports = { UserModel };
