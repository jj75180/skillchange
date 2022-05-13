const formidable=require("formidable");
const db=require("../routes/db-config");
const fs=require("fs");
const nodemailer=require("nodemailer");

const uploadfile=(req,res)=>{
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        console.log(fields);
      });
      return false;
}

const mail=(req,res)=>{
  const {recmail,username}=req.body;

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
    subject:'hello',
    text:username+'你好！', 
  };

  transporter.sendMail(option,(err,info)=>{
    if (err) {console.log(err);}
    else{
      console.log('訊息發送'+info.response);
    }
  })
}


module.exports=mail;