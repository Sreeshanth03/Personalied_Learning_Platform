const express = require("express");
const managerrouter = express.Router();
// const { authoriazation } = require("../Middlewares/Authorization.js");
const {checkRole,authoriazation}=require("../Middlewares/Authorization.js")
const {
  createapi,
  viewalltickects,
  ViewTickectById,
} = require("../Controllers/managercontroller.js");

managerrouter.post("/create",authoriazation,checkRole("Student"),createapi);
managerrouter.get("/viewtickects", authoriazation,checkRole("Student"),viewalltickects);
managerrouter.get("/viewtickects/:id",authoriazation ,checkRole("Student"),ViewTickectById);
module.exports = { managerrouter };
