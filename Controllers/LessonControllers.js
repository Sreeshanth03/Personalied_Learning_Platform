const { Lesson_Model } = require("../Models/Lessons");
const { CloudinaryFileUploadFromBuffer } = require("../Utiles/Cloduniary");
async function createLesson(req, res) {
  try {
 const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });
    
    const { title, course, order } = req.body;
const Lesson_Viedo=await CloudinaryFileUploadFromBuffer(
  file.buffer,
  file.originalname
)

  const Lesson_data = new Lesson_Model({
      order: order,
      title: title,
      course: course,
      content:Lesson_Viedo,
    });
    await Lesson_data.save();
    res
      .status(200)
      .json({ message: "Lessons Posted Successfully", Lesson_data });


 } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
module.exports = { createLesson };
