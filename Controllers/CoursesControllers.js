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
      res.status(500).json({ message: err.message, error: "err" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { createCourses };
