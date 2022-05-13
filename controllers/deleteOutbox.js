const db=require("../routes/db-config");

const deleteOutbox=(req,res)=>{
    
    const {msg_ID,msg_SendStatue}=req.body;
    console.log(req.body);
    db.query('UPDATE message SET msg_SendStatue=? WHERE msg_ID=?;',[msg_SendStatue,msg_ID],(err,result)=>{
        if (err) throw err;
    });
   
}
module.exports=deleteOutbox;