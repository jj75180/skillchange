
form.addEventListener("submit",()=>{
    var radionum = document.getElementById("form").SkillClass;
        for(let i=0;i<SkillClass.length;i++){
            if(radionum[i].checked){
                SkillClass=radionum[i].value
            }
        }
    const adlistion={
        id_account:id_account.value,
        caseinfo:caseinfo.value,
        SkillClass:SkillClass,
        CaseInformation:CaseInformation.value,
        local:local.value,
        area:area.value,
        expectedTime:expectedTime.value,
        coin:coin.value,
    }
    fetch("/api/adlistion",{
        method:"POST",
        body:JSON.stringify(adlistion),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json())
        .then(data=>{
            if(data.status=="error"){
                success.style.display="none"
                error.style.display="block"
                error.innerText=data.error
            }else{
                error.style.display="none"
                success.style.display="block"
                success.innerText=data.success
            }
        })
})


