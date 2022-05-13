const db=require("../routes/db-config");
const formidable=require("formidable");
const fs=require("fs");

const editUserProfile=(req,res)=>{
  const {id_num,id_name,id_mail,id_phonenum,id_address}=req.body;
  db.query('UPDATE identity SET id_name=?,id_mail=?,id_phonenum=?,id_address=? WHERE id_num=?;',[id_name,id_mail,id_phonenum,id_address,id_num],(err,result)=>{
      if(err) throw err;
  })
}

module.exports=editUserProfile;