const { query } = require("express");
const express = require("express");
const { DATE } = require("mysql/lib/protocol/constants/types");
const loggedIn = require("../controllers/loggedin");
const router = express.Router();
const logout = require("../controllers/logout");
const db = require("../routes/db-config");

router.get("/", loggedIn, (req, res) => {
  if (req.user) {
    db.query("SELECT * FROM caseactivityrecord", (err, result) => {
      if (err) throw err;
      req.data = result;
      res.render("index", {
        status: "loggedIn",
        user: req.user,
        data: req.data,
      });
    });
  } else {
    db.query("SELECT * FROM caseactivityrecord", (err, result) => {
      if (err) throw err;
      req.data = result;
      res.render("index", { status: "no", user: "nothing", data: req.data });
    });
  }
});

router.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "./public" });
});

router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./public" });
});
router.get("/404", loggedIn, (req, res) => {
  if (req.user) {
    res.render("404", { status: "loggedIn", user: req.user });
  } else {
    res.render("404", { status: "no", user: "nothing" });
  }
});
router.get("/about-us", loggedIn, (req, res) => {
  if (req.user) {
    res.render("about-us", { status: "loggedIn", user: req.user });
  } else {
    res.render("about-us", { status: "no", user: "nothing" });
  }
});

router.get("/contact-us", loggedIn, (req, res) => {
  if(req.user){
    res.render("contact-us", { status: "loggedIn", user: req.user });
  }else{
    res.sendFile("login.html", { root: "./public" });
  }
});

router.get("/Ad-listing", loggedIn, (req, res) => {
  if (req.user) {
    res.render("Ad-listing", { status: "loggedIn", user: req.user });
  } else {
    res.sendFile("login.html", { root: "./public" });
  }
});
router.get("/category", (req, res) => {
  res.render("category"); //Electronics搜尋結果
});

router.get("/dashboard-archived-ads", (req, res) => {
  res.render("dashboard-archived-ads"); //個人已刊登廣告列表
});
router.get("/dashboard-favourite-ads", (req, res) => {
  res.render("dashboard-favourite-ads"); //個人最愛廣告列表
});
router.get("/dashboard-my-ads", (req, res) => {
  res.render("dashboard-my-ads"); //個人總刊登廣告列表
});
router.get("/dashboard-pending-ads", (req, res) => {
  res.render("dashboard-pending-ads"); //個人待刊登廣告列表
});
router.get("/dashboard", (req, res) => {
  res.render("dashboard"); //個人已刊登廣告列表
});
router.get("/reant-intrduce", loggedIn, (req, res) => {
  if (req.user) {
    res.render("reant-intrduce", { status: "loggedIn", user: req.user });
  } else {
    res.render("reant-intrduce", { status: "no", user: "nothing" });
  }
});
router.get("/sell-intrduce", loggedIn, (req, res) => {
  if (req.user) {
    res.render("sell-intrduce", { status: "loggedIn", user: req.user });
  } else {
    res.render("sell-intrduce", { status: "no", user: "nothing" });
  }
});
router.get("/single-blog", (req, res) => {
  res.render("single-blog"); //用不到
});

router.get("/store", (req, res) => {
  res.render("store"); //用不到
});
router.get("/terms-condition", loggedIn, (req, res) => {
  res.render("terms-condition", { status: "loggedIn", user: req.user }); //隱私權頁面
});
router.get("/user-profile", (req, res) => {
  res.render("user-profile"); //會員編輯
});
router.get("/package", (req, res) => {
  res.render("package"); //用不到
});
router.get("/logout", logout);

//--刊登廣告頁面--//
router.get("/ad-list-view", loggedIn, (req, res) => {
    let Class = req.query.Class;
    let local = req.query.local;
    let all = req.query.adlistview;
    let Search=req.query.Search;
    let area=req.query.area;
    let Searchfinal='%'+Search+'%';

    if (Class) {
      Select = Class;
    } else if (local) {
      Select = local;
    } else if (all) {
      Select = all;
    } else if (Searchfinal){
      Select=Searchfinal;
    }
    switch (Select) {
      case Class:
        db.query(
          "SELECT * FROM caseactivityrecord WHERE SkillClass=? and case_staus='準備接單'",
          [Class],
          (err, result) => {
            if (err) throw err;
            req.data = result;
            res.render("ad-list-view", {
              status: "loggedIn",
              user: req.user,
              data: req.data,
            });
          }
        );
        break;
      case local:
        db.query(
          "SELECT * FROM caseactivityrecord WHERE local=? and case_staus='準備接單'",
          [local],
          (err, result) => {
            if (err) throw err;
            req.data = result;
            res.render("ad-list-view", {
              status: "loggedIn",
              user: req.user,
              data: req.data,
            });
          }
        );
        break;
      case all:
        db.query("SELECT * FROM caseactivityrecord where case_staus='準備接單'", (err, result) => {
          if (err) throw err;
          req.data = result;
          res.render("ad-list-view", {
            status: "loggedIn",
            user: req.user,
            data: req.data,
          });
        });
        break;
        case Searchfinal:
          db.query('select * From caseactivityrecord where (CaseInformation like ? or caseinfo like ?) and case_staus="準備接單";',[Searchfinal,Searchfinal,area],(err,result)=>{
            if(err) throw err;
            req.data = result;
            res.render("ad-list-view", {
              status: "loggedIn",
              user: req.user,
              data: req.data,
            });
          });
          break;
    }
});

//--技能詳細介紹頁面--//
router.get("/single", loggedIn, (req, res) => {
  if (req.user) {
    const singleCase = req.query.singleCase;
    db.query(
      "SELECT * FROM identity inner join caseactivityrecord on identity.id_account = caseactivityrecord.id_account WHERE case_num=?",
      [singleCase],
      (err, result) => {
        if (err) throw err;
        req.caseNo = result[0];
        res.render("single", {
          status: "loggedIn",
          data: req.caseNo,
          user: req.user,
        });
      }
    );
  } else {
    res.sendFile("login.html", { root: "./public" });
  }
});
//-會員中心連結--//

  router.get("/memberArea", loggedIn, (req, res) => {
    let user=req.user;
    res.render("memberArea", { status: "loggedIn", user: req.user});
  });


router.get("/AnnounceCase", loggedIn, (req, res) => {
  let user=req.user;
  db.query("SELECT * FROM caseactivityrecord WHERE id_account=? and case_staus !='驗收完成'",[user.id_account],(err,result)=>{
    if (err) throw err;
    data=result;
    res.render("AnnounceCase", { status: "loggedIn", user: req.user,data:data });
  })
});


router.get("/inBox", loggedIn, (req, res) => {
    let user=req.user;
    db.query('SELECT * FROM message inner join massagetext on msg_ID = msgt_ID where msg_RecID =? && msg_RecStatue != 1',[user.id_account],(err,result)=>{
        if(err) throw err;
        mail=result;  
        res.render("inBox", { status: "loggedIn", user: req.user,mail:mail });
    })
});

router.get("/outBox", loggedIn, (req, res) => {
  let user=req.user;
    db.query('SELECT * FROM message inner join massagetext on msg_ID = msgt_ID where msg_SendID =? && msg_SendStatue != 1',[user.id_account],(err,result)=>{
        if(err) throw err;
        mail=result;  
        res.render("outBox", { status: "loggedIn", user: req.user,mail:mail });
    })
});

router.get("/userProfile", loggedIn, (req, res) => {
  res.render("userProfile", { status: "loggedIn", user: req.user});
});

router.get("/blog", loggedIn, (req, res) => {
  res.render("blog", { status: "loggedIn", user: req.user });
});

router.get("/writeMail", loggedIn, (req, res) => {
    if(req.user){
    res.render("writeMail", { status: "loggedIn", user: req.user });
    }else 
    res.sendFile("login.html", { root: "./public" });
  });

  router.get("/AnotherUser", loggedIn, (req, res) => {
    res.render("AnotherUser", { status: "loggedIn", user: req.user });
  });

  router.get("/auditCase", loggedIn, (req, res) => {
    let user=req.user;
    db.query('SELECT * FROM caseactivityrecord inner join identity on caseactivityrecord.caseAcceptAccount = identity.id_account where caseactivityrecord.id_account=? and caseactivityrecord.case_staus="審核承接"',[user.id_account],(err,result)=>{
      if (err) throw err;
      data=result;
    db.query('SELECT * FROM caseactivityrecord inner join identity on caseactivityrecord.caseAcceptAccount = identity.id_account where caseactivityrecord.id_account=? and caseactivityrecord.case_staus="審核完成任務";',[user.id_account],(err,result)=>{
      if(err) throw err;
      finishdata=result;
      res.render("auditCase", { status: "loggedIn", user: req.user,data:data,finishdata:finishdata});
    })
    })
  });

  router.get("/WorkCase", loggedIn, (req, res) => {
    let user=req.user;
    db.query('SELECT * FROM caseactivityrecord inner join identity on caseactivityrecord.id_account = identity.id_account where caseactivityrecord.case_staus="執行任務" and caseactivityrecord.caseAcceptAccount=?;',[user.id_account],(err,result)=>{
      if (err) throw err;
      data=result;
      res.render("WorkCase", { status: "loggedIn", user: req.user});
    })
  });

  router.get("/test", loggedIn, (req, res) => {
    res.render("test", { status: "loggedIn", user: req.user });
  });

  router.get("/userState", loggedIn, (req, res) => {
    const id = req.query.id;
    db.query('SELECT * FROM identity WHERE id_num=?',[id],(err,result)=>{
      if (err) throw err;
      req.userPofile=result[0];
    db.query('SELECT * FROM identity inner join caseactivityrecord on identity.id_account = caseactivityrecord.id_account WHERE id_num=? and case_staus!="準備接單"',[id],(err,result)=>{
      if (err) throw err;
      data=result;
    db.query('SELECT caseactivityrecord.id_account,Evaluation,Star,case_completedtime FROM identity inner join caseactivityrecord on caseactivityrecord.caseAcceptAccount = identity.id_account where id_num=? and case_staus in ("驗收完成","任務失敗");',[id],(err,result)=>{
      if (err) throw err;
      Evaluation=result;
    db.query('SELECT SUM(Star)"TotalStar" FROM identity inner join caseactivityrecord on caseactivityrecord.caseAcceptAccount = identity.id_account where id_num=? and case_staus in ("驗收完成","任務失敗");',[id],(err,result)=>{
      if(err) throw err;
      TotalStar=result[0];
      res.render("userState", { status: "loggedIn", user: req.user,userPofile:req.userPofile,data:data,Evaluation:Evaluation,TotalStar:TotalStar});
    })
    })
    })
    })
  });

  router.get("/finalCase", loggedIn, (req, res) => {
    let user=req.user;
    db.query('SELECT * FROM caseactivityrecord inner join identity on caseactivityrecord.caseAcceptAccount = identity.id_account where caseactivityrecord.id_account=? and caseactivityrecord.case_staus="驗收完成"',[user.id_account],(err,result)=>{
      if (err) throw err;
      data=result;
      res.render("finalCase", { status: "loggedIn", user: req.user,data:data });
    })
  });
  router.get("/backstage", loggedIn, (req, res) => {
    let pages = req.query.pages;
    if(pages=='Allmember'){
      db.query('SELECT * FROM identity where id_exist=1',(err,result)=>{
        if(err) throw err;
        Allmember=result;
        res.render("backstage", { status: "loggedIn", user: req.user,Allmember:Allmember,status:'Allmember' });
      })
    }else if(pages=='AllCase'){
      db.query('SELECT *,DATE_FORMAT(case_completedtime, "%Y-%m-%d") case_completedtime,DATE_FORMAT(expectedTime, "%Y-%m-%d") expectedTime FROM caseactivityrecord',(err,result)=>{
        if (err) throw err;
        AllCase=result;
        res.render("backstage", { status: "loggedIn", user: req.user,AllCase:AllCase,status:'AllCase'});
      })

    }else if(pages=="failCase"){
      db.query('SELECT *,DATE_FORMAT(case_completedtime, "%Y-%m-%d") case_completedtime,DATE_FORMAT(expectedTime, "%Y-%m-%d") expectedTime FROM caseactivityrecord where case_staus="任務失敗"',(err,result)=>{
        if(err) throw err;
        failCase=result;
        res.render("backstage", { status: "loggedIn", user: req.user,failCase:failCase,status:'failCase'});
      })
    }else{
      res.render("backstage", { status: "loggedIn", user: req.user});
    }
  });



module.exports = router; 