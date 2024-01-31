import express  from "express";
import bodypraser from "body-parser"

const app = express();
const port = 3000;

app.use(bodypraser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
 res.render("login.ejs");
});

app.post("/login",(req,res)=>{
    const username= req.body.username;
    const password=req.body.password;
    console.log(username);
    console.log(password);
    res.render("login.ejs");
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});