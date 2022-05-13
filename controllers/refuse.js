const db=require("../routes/db-config");

const refuse=(req,res)=>{
    const {case_staus,case_num,caseAcceptAccount}=req.body;
    console.log(req.body);
    db.query('UPDATE caseactivityrecord SET case_staus=?,caseAcceptAccount=? WHERE case_num=?;',[case_staus,caseAcceptAccount,case_num],(err,result)=>{
        if (err) throw err;
    });
   
}
module.exports=refuse;