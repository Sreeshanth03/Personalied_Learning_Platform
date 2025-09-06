const { UserModel } = require("../Models/Models");
const { Course_Model } = require("../Models/Course");
const { Enroll_Model } = require("../Models/Enrollment");

// Student enrollment
const enrollStudent = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id; // token nundi student id

    // 1. Course exists check
    const course = await Course_Model.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2. Already enrolled check
    const exists = await Enroll_Model.findOne({ student: studentId, course: courseId });
    if (exists) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // 3. Create enrollment
    const enrollment = new Enroll_Model({
      student: studentId,
      course: courseId,
    });

    await enrollment.save();

    // Populate response with course details
    const populatedEnrollment = await enrollment.populate("course", "title description");

    res.status(201).json({
      message: "Enrollment successful",
      enrollment: populatedEnrollment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Instructor - get enrolled students for a course
const getEnrolledStudents = async (req, res) => {
  try {
    const { courseId } = req.params;

    // 1. Validate course
    const course = await Course_Model.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2. Fetch enrollments with populated data
    const students = await Enroll_Model.find({ course: courseId })
      .populate("student", "name email") 
      .populate("course", "title description");

    if (!students.length) {
      return res.status(200).json({ message: "No students enrolled yet", students: [] });
    }

    res.status(200).json({
      message: "Enrolled students fetched successfully",
      students,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { enrollStudent, getEnrolledStudents };
