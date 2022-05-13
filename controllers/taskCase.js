const db=require("../routes/db-config");
const nodemailer=require("nodemailer");

const taskCase=(req,res)=>{
    const {case_staus,case_num,caseAcceptAccount,recmail,caseinfo,username}=req.body;
    db.query('UPDATE caseactivityrecord SET case_staus=?,caseAcceptAccount=? WHERE case_num=?',[case_staus,caseAcceptAccount,case_num],(err,result)=>{
        if (err) throw err;
        return res.json({status:"succ", succ:"承接完成！"})
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
        subject:'技能交換平台官方：'+username+'您好！您的'+caseinfo+'任務需要審核',
        text:'嗨！有人接受了您在平台上所發佈的任務，快來技能交換平台看看此專家是否符合您的需求。(提醒您，任務需要您審核過後才能開始喔！)',
        };
    transporter.sendMail(option,(err,info)=>{
        if(err){console.log(err);}
        else{
            console.log('訊息發送成功'+info.response);
        }
    })

}
module.exports=taskCase;
