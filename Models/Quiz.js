const mongoose=require('mongoose');
const QuizSchema=mongoose.Schema({
    course:{type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }
})