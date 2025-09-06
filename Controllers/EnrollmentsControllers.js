const User = require("../Models/Models");
const { Enroll_Model } = require("../Models/Enrollment");

// Student enrollment
const enrollStudent = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id; // token nundi student id

    // already enrolled aithe error return cheyyali
    const exists = await Enroll_Model.findOne({ student: studentId, course: courseId });
    if (exists) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = new Enroll_Model({
      student: studentId,
      course: courseId,
    });

    await enrollment.save();

    res.status(201).json({
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Instructor - get enrolled students
const getEnrolledStudents = async (req, res) => {
  try {
    const { courseId } = req.params;

    const students = await Enroll_Model.find({ course: courseId })
      .populate("student", "name email") // student info
      .populate("course", "title"); // course info

    res.status(200).json({
      message: "Enrolled students fetched successfully",
      students,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { enrollStudent, getEnrolledStudents };
