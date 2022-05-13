const db=require("../routes/db-config");
const nodemailer=require("nodemailer");

const complete=(req,res)=>{
    const {case_num,case_staus,case_describe,case_completedtime,recmail,caseinfo,username}=req.body;
    console.log(req.body);
    db.query('UPDATE caseactivityrecord SET case_staus=?,case_describe=?,case_completedtime=? WHERE case_num=?;',[case_staus,case_describe,case_completedtime,case_num],(err,result)=>{
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
        subject:'技能交換平台官方：'+username+'您好！您的'+caseinfo+'任務已完成。',
        text:username+'你好！請至技能交換平台網站審核您完成的案子。',
        };
    transporter.sendMail(option,(err,info)=>{
        if(err){console.log(err);}
        else{
            console.log('訊息發送成功'+info.response);
        }
    })
   
}
module.exports=complete;
