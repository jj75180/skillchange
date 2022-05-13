const db=require("../routes/db-config");
const nodemailer=require("nodemailer");

const finalCase=(req,res)=>{
    const {case_num,case_staus,recmail,caseinfo,username,coin,Star,Evaluation}=req.body;
    console.log(req.body);
    db.query('UPDATE caseactivityrecord SET case_staus=?,Evaluation=?,Star=? WHERE case_num=?;',[case_staus,Evaluation,Star,case_num],(err,result)=>{
        if (err) throw err;
    });
    db.query('UPDATE identity SET user_coin=user_coin+? WHERE id_name=? and id_num>0;',[coin,username],(err,result)=>{
        if(err) throw err;
    })
    
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
        subject:'技能交換平台官方：'+username+'您好！您承接的任務'+caseinfo+'已被驗收完成。',
        text:username+'你好！請至技能交換平台網站查看。',
        };
    transporter.sendMail(option,(err,info)=>{
        if(err){console.log(err);}
        else{
            console.log('訊息發送成功'+info.response);
        }
    })
   
}
module.exports=finalCase;