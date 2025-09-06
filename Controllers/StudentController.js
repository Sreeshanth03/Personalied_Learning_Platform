const { Course_Model } = require("../Models/Course");
const { Enroll_Model } = require("../Models/Enrollment");
const { Lesson_Model } = require("../Models/Lessons");

// ✅ Get all available courses
const getAvailableCourses = async (req, res) => {
  try {
    const courses = await Course_Model.find().populate("createdBy", "name email");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get single course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course_Model.findById(req.params.id)
      .populate("createdBy", "name email"); // use createdBy
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get enrolled courses of logged-in student
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enroll_Model.find({ student: req.user._id })
      .populate("course", "title description createdBy") // include createdBy if needed
      .populate("student", "name email");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get lessons of a course (only if enrolled)
const getLessonsForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // check if student enrolled
    const enrollment = await Enroll_Model.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(403).json({ message: "You are not enrolled in this course" });
    }

    // fetch lessons
    const lessons = await Lesson_Model.find({ course: courseId });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAvailableCourses,
  getCourseById,
  getMyEnrollments,
  getLessonsForCourse,
};
