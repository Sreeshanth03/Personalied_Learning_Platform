const express=require('express');
const app=express();
const dotenv=require('dotenv')
dotenv.config();
const cors = require("cors");
const {router}=require("./Routers/authRouters.js")
const {Courses_router}=require("./Routers/Courses_Router.js")
const {errorhandling}=require("./Middlewares/ErrorHandlingMiddleWare.js")
const {Lesson_Router}=require("./Routers/Lesson_Routes.js")
//calling cors
app.use(cors({
    origin:"http://localhost:5173",
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
//Demo Routing
// app.get("/nani",(req,res)=>{
//     res.send("The servre is her")
// })

//error handling
app.use(errorhandling)
//Server
app.listen(process.env.Port,()=>{console.log("The server is running")})