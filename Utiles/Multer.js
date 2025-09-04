// const multer = require("multer");
// const path = require("path");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "..", "ProfileUpload"));
//   },

//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// module.exports = { upload };
const multer = require("multer");

// Store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = { upload };
