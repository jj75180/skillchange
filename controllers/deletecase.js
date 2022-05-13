const db=require("../routes/db-config");

const deletecase=(req,res)=>{
    const {case_num,case_staus}=req.body;
    db.query('UPDATE caseactivityrecord SET case_staus=? WHERE case_num=?;',[case_staus,case_num],(err,result)=>{
        if (err) throw err;
    });
   
}
module.exports=deletecase;