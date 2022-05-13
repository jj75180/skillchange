
writeMail.addEventListener("submit",()=>{
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; 
    let msgt_PDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
    console.log("123");
    const writeMail={
        msg_SendID:msg_SendID.value,
        msg_RecID:msg_RecID.value,
        msgt_Subject:msgt_Subject.value,
        msgt_massage:msgt_massage.value,
        msgt_PDate:msgt_PDate,
    }
    fetch("/api/writeMail",{
        method:"POST",
        body:JSON.stringify(writeMail),
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

