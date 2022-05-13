const db=require("../routes/db-config");

const writeMail=(req,res)=>{
    const {msg_SendID,msg_RecID,msgt_Subject,msgt_massage,msgt_PDate}=req.body;
    if(!msg_SendID|| !msg_RecID || !msgt_Subject  || !msgt_massage || !msgt_PDate) return res.json({status:"error",error:"還沒完成寫信喔！"});
    else{
        db.query('INSERT INTO massagetext SET?',{msgt_Subject:msgt_Subject,msgt_massage:msgt_massage,msgt_PDate:msgt_PDate},(err,result)=>{
            if(err) throw err;
            return res.json({status:"success", success:"傳送完成！"})
        })
        db.query('INSERT INTO message SET?',{msg_SendID:msg_SendID,msg_RecID:msg_RecID},(err,result)=>{
            if(err) throw err;
        })
    }
}
module.exports=writeMail;