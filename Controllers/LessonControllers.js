const { Lesson_Model } = require("../Models/Lessons");
const { CloudinaryFileUploadFromBuffer } = require("../Utiles/Cloduniary");

async function createLesson(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const { title, course, order } = req.body;

    // ✅ Upload video to Cloudinary
    const Lesson_Video = await CloudinaryFileUploadFromBuffer(
      file.buffer,
      file.originalname
    );

    // ✅ Create Lesson (store only ObjectId reference)
    const Lesson_data = new Lesson_Model({
      order,
      title,
      course: course,
      content: Lesson_Video,
    });

    await Lesson_data.save();

    res.status(200).json({
      message: "Lesson Posted Successfully",
      Lesson_data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function GetLessons(req, res) {
  try {
    const Lessons=await Lesson_Model.find();
    res.status(200).json({
      "message":"All Are Fetched",
      Lessons
    })
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createLesson, GetLessons };
