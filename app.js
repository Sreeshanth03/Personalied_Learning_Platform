const express=require('express');
const app=express();
const dotenv=require('dotenv')
dotenv.config();
const cors = require("cors");
const {router}=require("./Routers/authRouters.js")
const {Courses_router}=require("./Routers/Courses_Router.js")
const {errorhandling}=require("./Middlewares/ErrorHandlingMiddleWare.js")
const {Lesson_Router}=require("./Routers/Lesson_Routes.js")
const {Student_Router}=require("./Routers/StudentRoutes.js")
const {Enroll_Routes}=require("./Routers/EnrollRoutes.js")
//calling cors
const allowedOrigins = [
  "http://localhost:5173",
  "https://personailed-learning-platform-fi6f.vercel.app"
];
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
//importing Db connection
const {ConnectionDb}=require("./Config/Database.js")
ConnectionDb()

//MiddleWares
app.use(express.json())
app.use(express.urlencoded())

//api
app.use("/auth",router)
app.use("/Courses",Courses_router)
app.use("/Lessons",Lesson_Router)
app.use("/Enroll",Enroll_Routes)
app.use("/student",Student_Router)
//Demo Routing
// app.get("/nani",(req,res)=>{
//     res.send("The servre is her")
// })

//error handling
app.use(errorhandling)
//Server
app.listen(process.env.Port,()=>{console.log("The server is running")})