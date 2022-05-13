const db=require("../routes/db-config");
const bcrypt=require("bcryptjs");


const register=async(req,res)=>{
    const {account,password:Npassword,username,email,ID,address,phone}=req.body;
    if(!account || !email || !Npassword || !username || !email || !ID || !address || !phone) return res.json({status:"error",error:"請輸入註冊資料"});
    else{
        db.query('SELECT * FROM identity WHERE id_mail=? and id_account=?',[email,account],async(err,result)=>{
            if (err) throw err;
            if(result[0]) return res.json({status:"error",error:"電子信箱或帳號已經被註冊"})
            else{
                const password=await bcrypt.hash(Npassword,8);
                db.query('INSERT INTO identity SET?',{id_name: username,
                    id_account: account,
                    id_password: password,
                    id_mail: email,
                    id_phonenum: phone,
                    id_address:address,
                    id_idnum:ID},(error,result)=>{
                    if(error) throw error;
                    return res.json({status:"success", success:"註冊完成"})
                })
            }
        })
    }
    
};

module.exports=register;
