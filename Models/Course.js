// const mongoose = require("mongoose");
// const Course_Schema = new mongoose.Schema({
//   // title: { type: String, required: true },
//   // description: { type: String, required: true },
//   // category: { type: String },
//   video: {
//   type:String                    // in seconds
//   },
//   // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   // lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
//   createdAt: { type: Date, default: Date.now }
// });

// const Course_Model = mongoose.model("courses", Course_Schema);
// module.exports = { Course_Model };



// new 
// const { Schema, Types } = require("mongoose");
// const Course_Schema = new mongoose.Schema({
//   video: { type: String },

//   createdAt: { type: Date, default: Date.now },
//   createdBy:{type:SchemaTypes.objectId,}
// });

// const Course_Model = mongoose.model("courses", Course_Schema);
// module.exports={Course_Model}
//new 1
const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const Course_Schema = new Schema({
  video: { type: String },

  createdAt: { type: Date, default: Date.now },

  // Correct way to use ObjectId
  createdBy: { type: Types.ObjectId, ref: "User" }, 
});

const Course_Model = mongoose.model("Course", Course_Schema);

module.exports = { Course_Model };

