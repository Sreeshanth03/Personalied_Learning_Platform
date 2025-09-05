const { Course_Model } = require("../Models/Course.js");
const { CloudinaryFileUploadFromBuffer } = require("../Utiles/Cloduniary.js");

async function createCourses(req, res) {
  try {
    const { title, description, category } = req.body; // text fields
const file = req.file; // uploaded file

    // const { title, description, category, file } = req.file;
    console.log("File received:", req.file);
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Upload to Cloudinary using buffer + originalname
    const videoUrl = await CloudinaryFileUploadFromBuffer(
      file.buffer,
      file.originalname
    );
    try {
      const course = new Course_Model({
        title: title,
        description: description,
        category: category,
        video: videoUrl,
      });
      await course.save();
      console.log("Saved to DB:", course);
      res.status(200).json(course);
    } catch (err) {
      console.error("Error saving to DB:", err);
      res.status(500).json({ message: err.message, error: "err" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function GetAllCourses(req, res) {
  try {
    // Fetch all courses from the database
    const courses = await Course_Model.find(); // returns an array of courses

    // Send the courses as JSON response
    res.status(200).json({ courses });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
}
async function GetById(req,res){

}


module.exports = { createCourses, GetAllCourses,GetById };
