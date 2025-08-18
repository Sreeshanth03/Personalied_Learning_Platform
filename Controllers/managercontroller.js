function createapi(req,res){
    res.send("The post")
}
function viewalltickects(req,res){
        res.send("Viwed all tickects")
}
function ViewTickectById(req,res){
    res.send("View by Id")
}
module.exports={createapi,viewalltickects,ViewTickectById}