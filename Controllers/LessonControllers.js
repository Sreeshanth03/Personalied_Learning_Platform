const { Lesson_Model } = require("../Models/Lessons");
const { Course_Model } = require("../Models/Course.js");
const { CloudinaryFileUploadFromBuffer } = require("../Utiles/Cloduniary");

async function createLesson(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const { title, course, order } = req.body;

    // ✅ Validate course exists
    const DataCourse = await Course_Model.findById(course);
    if (!DataCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Upload video to Cloudinary
    const Lesson_Video = await CloudinaryFileUploadFromBuffer(
      file.buffer,
      file.originalname
    );

    // ✅ Create Lesson (store only ObjectId reference)
    const Lesson_data = new Lesson_Model({
      order,
      title,
      course: DataCourse._id,
      content: Lesson_Video,
    });

    await Lesson_data.save();

    // ✅ Populate after saving (for response only)
    const PopulatedLesson = await Lesson_Model.findById(Lesson_data._id).populate("course");

    res.status(200).json({
      message: "Lesson Posted Successfully",
      Lesson: PopulatedLesson, // populated for response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createLesson };
