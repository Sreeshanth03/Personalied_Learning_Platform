const { UserModel } = require("../Models/Models.js");
const bcrypt = require("bcryptjs");
const { CloudinaryFileUpload } = require("../Utiles/Cloduniary.js");
async function editProfile(req, res) {
  try {
    const { name, username, password, role } = req.body;
    const profilepath = req.file;
console.log(profilepath)
    const UserId = req.user.id;
    const filepath = await CloudinaryFileUpload(profilepath.path);
    // console.log(filepath)
    if (name || username || password || role) {
      const hashpassword = await bcrypt.hash(password, 12); //--> we are sending these because we have to //store in the hash format

      const updateUser = await UserModel.findByIdAndUpdate(
        UserId,
        {
          name,
          username,
          password: hashpassword,
          role,
          profile: filepath,
        },
        { new: true }
      ); //->because to return the updated values

      res.json({
        name: name,
        username: username,
        password: hashpassword,
        role: role,
        profile: filepath,
      });
    } else {
      res.send("No user find");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = { editProfile };
