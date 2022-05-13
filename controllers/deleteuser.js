const db=require("../routes/db-config");

const deleteuser=(req,res)=>{
    const {id_num,id_exist}=req.body;
    db.query('UPDATE identity SET id_exist=? WHERE id_num=?;',[id_exist,id_num],(err,result)=>{
        if(err) throw err;
    })


}
module.exports=deleteuser;