const express=require("express")
const db=require("./routes/db-config");
const app=express();
const cookie = require("cookie-parser");
const PORT=process.env.PORT || 5000;
const fs = require("fs");
const bodyParser = require('body-parser');
let engine = require('ejs-locals');

app.use("/js", express.static("js"))
app.use("/js", express.static("./public/js"))
app.use("/css", express.static("./public/css"))
app.use("/images", express.static("./public/images"))
app.use("/plugins", express.static("./public/plugins"))

app.engine('ejs', engine);
app.set("view engine","ejs");
app.set("views","./views");
app.use(cookie());

app.use(bodyParser.json());
app.use(express.json());

db.getConnection((err)=>{
    if(err) throw err;
    console.log("database connected");
});


app.use("/",require("./routes/pages"));
app.use("/api",require("./controllers/auth"));
app.listen(PORT);



