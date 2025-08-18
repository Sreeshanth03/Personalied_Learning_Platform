const mongoose = require("mongoose");
require("dotenv");
async function ConnectionDb() {
  await mongoose.connect(process.env.mongo_db_uri, { dbName: process.env.mongodb_name });
    console.log("Database Connected Successfully");
}
module.exports = { ConnectionDb };
