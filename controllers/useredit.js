const db=require("../routes/db-config");

const useredit=(req,res)=>{
    const {id_num,id_name,id_account,id_mail,id_phonenum,id_address,id_idnum}=req.body;
    db.query('UPDATE identity SET id_name=?,id_account=?,id_mail=?,id_phonenum=?,id_address=?,id_idnum=? WHERE id_num=?;',[id_name,id_account,id_mail,id_phonenum,id_address,id_idnum,id_num],(err,result)=>{
        if(err) throw err;
    })
}
module.exports=useredit;