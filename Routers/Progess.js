
// Student
Student_Router.get("/courses/:courseId/progress", checkAuth, checkRole("Student"), getStudentProgress);

// Instructor
Courses_router.get("/:courseId/progress", checkAuth, checkRole("Instructor"), getCourseProgress);
