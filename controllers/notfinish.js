const db=require("../routes/db-config");
const nodemailer=require("nodemailer");

const finalCase=(req,res)=>{
    const {case_num,case_staus,recmail,caseinfo,username,Star,Evaluation}=req.body;

    db.query('UPDATE caseactivityrecord SET case_staus=?,Evaluation=?,Star=? WHERE case_num=?;',[case_staus,Evaluation,Star,case_num],(err,result)=>{
        if (err) throw err;
    });
    
    const transporter=nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'shiki272753@gmail.com',
          pass: 'seal272753'
        },
      });
    let option={
        form:'shiki272753@gmail.com',
        to:recmail,
        subject:'技能交換平台官方：'+username+'您好！很抱歉，您承接的任務'+caseinfo+'驗收失敗。',
        text:username+'您好，您的任務未被驗收完成，請至平台查看原因，謝謝。',
        };
    transporter.sendMail(option,(err,info)=>{
        if(err){console.log(err);}
        else{
            console.log('訊息發送成功'+info.response);
        }
    })
   
}
module.exports=finalCase;