const db=require("../routes/db-config");

const adlistion=(req,res)=>{
    const {id_account,caseinfo,SkillClass,CaseInformation,local,area,expectedTime,coin}=req.body;
    if(!id_account|| !caseinfo || !CaseInformation  || !area || !expectedTime || !coin || !local || !SkillClass ) return res.json({status:"error",error:"還沒完成刊登喔！"});
    else{
        db.query('INSERT INTO caseactivityrecord SET?',{id_account:id_account,caseinfo:caseinfo,SkillClass:SkillClass,CaseInformation:CaseInformation,local:local,area:area,expectedTime:expectedTime,coin:coin},(err,result)=>{
            if(err) throw err;
            return res.json({status:"success", success:"刊登完成！"})
        })
    }
}
    

module.exports=adlistion;
