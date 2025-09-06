const mongoose=require('mongoose');
const QuizSchema=mongoose.Schema({
    course:{type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
     lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson", // Reference to Lesson model
    required: true,
  },
   generatedBy: {
    type: String,
    enum: ["AI", "instructor"], // only two options
    required: true,
  },
   createdAt: {
    type: Date,
    default: Date.now,
  }
})
const QuizModel=mongoose.model("Quiz",QuizSchema)