const { Course_Model } = require("../Models/Course.js");
const { CloudinaryFileUploadFromBuffer } = require("../Utiles/Cloduniary.js");

async function createCourses(req, res) {
  try {
    const { title, description, category } = req.body; // text fields
    const file = req.file; // uploaded file

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Upload to Cloudinary using buffer + originalname
    const videoUrl = await CloudinaryFileUploadFromBuffer(
      file.buffer,
      file.originalname
    );

    // ✅ Save with createdBy (schema field)
    const course = new Course_Model({
      title,
      description,
      category,
      video: videoUrl,
      createdBy: req.user.id, // use createdBy instead of instructor
    });

    await course.save();
    console.log("Saved to DB:", course);

    res.status(200).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: error.message });
  }
}

async function GetAllCourses(req, res) {
  try {
    // ✅ populate instructor info (name + email) using createdBy field
    const courses = await Course_Model.find()
      .populate("createdBy", "name email");

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ Get single course by Id
async function GetById(req, res) {
  try {
    const { id } = req.params;
    const course = await Course_Model.findById(id)
      .populate("createdBy", "name email")
      .populate("students", "name email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createCourses, GetAllCourses, GetById };
