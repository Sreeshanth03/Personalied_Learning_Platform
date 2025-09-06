const { Lesson_Model } = require("../Models/Lessons");
async function createLesson(req, res) {
  try {
    // const { content } = req.file;
    const { title, course, order } = req.body;
    const Lesson_data = new Lesson_Model({
      order: order,
      title: title,
      course: course,
    //   content,
    });
    await Lesson_Model.save();
    res
      .status(200)
      .json({ message: "Lessons Posted Successfully", Lesson_data });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}
module.exports = { createLesson };
