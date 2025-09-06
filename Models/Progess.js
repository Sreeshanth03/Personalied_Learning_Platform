const mongoose = require("mongoose");

const Progress_Schema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lessons" }],
  updatedAt: { type: Date, default: Date.now },
});

const Progress_Model = mongoose.model("Progress", Progress_Schema);
module.exports = { Progress_Model };
