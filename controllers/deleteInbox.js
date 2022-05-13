const db=require("../routes/db-config");

const deleteInbox=(req,res)=>{
    const {msg_ID,msg_RecStatue}=req.body;
    db.query('UPDATE message SET msg_RecStatue=? WHERE msg_ID=?;',[msg_RecStatue,msg_ID],(err,result)=>{
        if (err) throw err;
    });
   
}
module.exports=deleteInbox;