// const mongoose = require("mongoose");
// require("dotenv").config();
// async function ConnectionDb() {
//   await mongoose.connect(process.env.mongo_db_uri, { dbName: process.env.mongodb_name });
//     console.log("Database Connected Successfully");
// }
// module.exports = { ConnectionDb };
// ---------------------------------------------------------
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function ConnectionDb() {
  try {
    await mongoose.connect(process.env.mongo_db_uri + process.env.mongodb_name, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // exit if connection fails
  }
}

module.exports = {ConnectionDb};
