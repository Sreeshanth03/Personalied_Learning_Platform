const { Course_Model } = require("../Models/Course.js");
const { Progress_Model } = require("../Models/Progess.js");
const { Lesson_Model } = require("../Models/Lessons.js");
const { CloudinaryFileUploadFromBuffer } = require("../Utiles/Cloduniary.js");
const {Enroll_Model}=require("../Models/Enrollment.js")
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
const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    // fetch all students enrolled in this course
    const enrollments = await Enroll_Model.find({ course: courseId }).populate("student", "name email");

    const progressList = await Promise.all(
      enrollments.map(async (enroll) => {
        const progress = await Progress_Model.findOne({ student: enroll.student._id, course: courseId });
        const totalLessons = await Lesson_Model.countDocuments({ course: courseId });
        const completedCount = progress ? progress.completedLessons.length : 0;
        const percentage = totalLessons ? (completedCount / totalLessons) * 100 : 0;

        return {
          student: enroll.student,
          completedCount,
          totalLessons,
          percentage: percentage.toFixed(2),
          completedLessons: progress ? progress.completedLessons : [],
        };
      })
    );

    res.status(200).json(progressList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCourses, GetAllCourses, GetById,getCourseProgress };
