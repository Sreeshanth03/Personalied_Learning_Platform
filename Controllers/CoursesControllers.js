// const { Course_Model } = require("../Models/Course.js");
// const { CloudinaryFileUpload } = require("../Utiles/Cloduniary.js");
// async function createCourses(req, res) {
//   try {
//     res.send()
//     // const { title, description, category} = req.body;
//     const Viedo = req.file;
// if (!Viedo) {
//   return res.status(400).json({ message: "No file uploaded" });
// }
//     const ViedoUrl = await CloudinaryFileUpload(Viedo);
//     console.log(ViedoUrl);
//     const course = new Course_Model({
//       // title,
//       // description,
//       // category,
//       ViedoUrl: ViedoUrl,
//     });
//     await course.save();
//     // console.log(savedCourse);
//     res.status(200).json(course);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }
// function getCoursesById(req, res) {
//   res.send("By id ");
// }
// module.exports = { createCourses, getCoursesById };

const { Course_Model } = require("../Models/Course.js");
const { CloudinaryFileUploadFromBuffer } = require("../Utiles/Cloduniary.js");

async function createCourses(req, res) {
  try {
 const file = req.file;
console.log("File received:", req.file);
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Upload to Cloudinary using buffer + originalname
    const videoUrl = await CloudinaryFileUploadFromBuffer(
      file.buffer,
      file.originalname
    );
try {
  const course = new Course_Model({ video: videoUrl });
  await course.save();
  console.log("Saved to DB:", course);
  res.status(200).json(course);
} catch (err) {
  console.error("Error saving to DB:", err);
  res.status(500).json({ message: err.message,error:"err" });
}
//     const course = new Course_Model({
//       video: videoUrl,
      
//     });
//     console.log("Cloudinary URL:", videoUrl);
// await course.save();



//     res.send(course);
//     console.log(course)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { createCourses };
