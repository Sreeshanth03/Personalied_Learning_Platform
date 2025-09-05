const  errorhandling=(err,req,res,next)=>{
console.log(err)
res.json({statusCode:err.statusCode,message:err.message,errors:err.errors})
}
module.exports={errorhandling}