const db=require("../routes/db-config");
const nodemailer=require("nodemailer");

const sendmail=(req,res)=>{
    const {text,subject,recmail}=req.body;

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
        subject:subject,
        text:text,
        };
    transporter.sendMail(option,(err,info)=>{
        if(err){console.log(err);}
        else{
            console.log('訊息發送成功'+info.response);
        }
    })
   
}
module.exports=sendmail;