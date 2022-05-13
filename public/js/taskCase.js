
taskCase.addEventListener("submit",()=>{
    let case_staus="審核承接";

    const taskCase={
        recmail:recmail.value,
        caseinfo:caseinfo.value,
        case_staus:case_staus,
        case_num:case_num.value,
        caseAcceptAccount:caseAcceptAccount.value,
        username:username.value,
    }
    console.log(taskCase);
    fetch("/api/taskCase",{
        method:"POST",
        body:JSON.stringify(taskCase),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json())
        .then(data=>{
            if(data.status=="err"){
                succ.style.display="none"
                error.style.display="block"
                error.innerText=data.error
            }else{
                error.style.display="none"
                succ.style.display="block"
                succ.innerText=data.succ
            }
        })
})

