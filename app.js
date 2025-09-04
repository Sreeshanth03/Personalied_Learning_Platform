const express=require('express');
const app=express();
const dotenv=require('dotenv')
dotenv.config();
const cors = require("cors");
const {router}=require("./Routers/authRouters.js")
const {router1}=require("./Routers/UserRoutes.js")
const{managerrouter}=require("./Routers/Mangaers.js")
const {Student}=require("./Routers/Student.js")
const {Courses_router}=require("./Routers/Courses_Router.js")
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
app.use("/user",router1)
// app.use("/tickect",managerrouter)
// app.use("/Student",Student)
app.use("/Courses",Courses_router)
//Demo Routing
// app.get("/nani",(req,res)=>{
//     res.send("The servre is her")
// })

//error handling
const  errorhandling=(err,req,res,next)=>{
console.log(err)
res.json({statusCode:err.statusCode,message:err.message,errors:err.errors})
}
app.use(errorhandling)
//Server
app.listen(process.env.Port,()=>{console.log("The server is running")})