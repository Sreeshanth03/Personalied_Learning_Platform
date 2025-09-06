const { Lesson_Model } = require("../Models/Lessons");
const { Course_Model } = require("../Models/Course.js");
const { CloudinaryFileUploadFromBuffer } = require("../Utiles/Cloduniary");
const mongoose = require("mongoose");

async function createLesson(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const { title, course, order } = req.body;

    // ✅ Check if all fields are present
    if (!title || !course || !order) {
      return res.status(400).json({ message: "Title, course, and order are required" });
    }

    // ✅ Validate course ID
    if (!mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    // ✅ Find course
    const DataCourse = await Course_Model.findById(course);
    if (!DataCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Upload video to Cloudinary
    const Lesson_Video = await CloudinaryFileUploadFromBuffer(file.buffer, file.originalname);

    // ✅ Create new lesson
    const Lesson_data = new Lesson_Model({
      order,
      title,
      course: DataCourse._id,
      content: Lesson_Video,
    });

    await Lesson_data.save();

    // ✅ Optionally, add lesson to course's lessons array
    if (DataCourse.lessons) {
      DataCourse.lessons.push(Lesson_data._id);
      await DataCourse.save();
    }

    // ✅ Populate course field in the lesson for response
    const PopulatedLesson = await Lesson_Model.findById(Lesson_data._id).populate("course");

    res.status(200).json({
      message: "Lesson Posted Successfully",
      Lesson: PopulatedLesson,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createLesson };
