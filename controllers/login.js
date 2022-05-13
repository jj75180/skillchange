const jwt=require("jsonwebtoken");
const db=require("../routes/db-config");
const bcrypt=require("bcryptjs");
const { rmSync } = require("fs");

const login=async(req,res)=>{
    const {account,password}=req.body;
    if(!account||!password)return res.json({status:"error",error:"請輸入帳號或密碼"});
    else{
        db.query("SELECT * FROM identity WHERE id_account=? and id_exist=1",[account],async(Err,result)=>{
            if(Err) throw Err;
            if(!result.length || !await bcrypt.compare(password,result[0].id_password)) return res.json({status:"error",error:"帳號密碼錯誤"})
            else{
                const token=jwt.sign({id:result[0].id_num}, process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_EXPIRES,
                })
                const cookieOptions={
                    expiresIn:new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
                    httpOnly:true
                }
                res.cookie("userRegistered",token,cookieOptions);
                return res.json({status:"success", success:"成功登入"});
                
            }
        })
    }
}

module.exports=login;