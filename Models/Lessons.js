const mongoose = require("mongoose");
const Lesson_Schema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Lesson_Model=mongoose.model("Lessons",Lesson_Schema)
module.exports={Lesson_Model}
