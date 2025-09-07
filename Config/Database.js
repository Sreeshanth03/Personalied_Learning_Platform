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

// Load environment variables from .env
dotenv.config();

async function ConnectionDb() {
  try {
    // ✅ Use template string if you want to include db name separately
    const uri = `${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_NAME}`;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit process if DB connection fails
  }
}

module.exports = {ConnectionDb};

