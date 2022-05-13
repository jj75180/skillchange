const express=require("express");
const register=require("./register");
const login=require("./login");
const adlistion=require("./adlistion");
const writeMail=require("./writeMail");
const router=express.Router();
const mail=require("./mail");
const editUserProfile=require("./editUserProfile");
const taskCase=require("./taskCase");
const AcceptCase=require("./AcceptCase");
const refuse=require("./refuse");
const finalCase=require("./finalCase");
const complete=require("./complete");
const deleteInbox=require("./deleteInbox");
const deleteOutbox=require("./deleteOutbox");
const useredit=require("./useredit");
const deleteuser=require("./deleteuser");
const sendmail=require("./sendmail");
const deletecase=require("./deletecase");
const notfinish=require("./notfinish");

router.post("/register",register);
router.post("/login",login);
router.post("/adlistion",adlistion);
router.post("/writeMail",writeMail);
router.post("/mail",mail);
router.post("/editUserProfile",editUserProfile);
router.post("/taskCase",taskCase);
router.post("/AcceptCase",AcceptCase);
router.post("/refuse",refuse);
router.post("/complete",complete);
router.post("/finalCase",finalCase);
router.post("/deleteInbox",deleteInbox);
router.post("/deleteOutbox",deleteOutbox);
router.post("/useredit",useredit);
router.post("/deleteuser",deleteuser);
router.post("/sendmail",sendmail);
router.post("/deletecase",deletecase);
router.post("/notfinish",notfinish);



module.exports=router;