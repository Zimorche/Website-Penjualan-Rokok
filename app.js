import express from "express";


const PORT = 3000;
const app = express();


app.use(express.static("public"));
app.set("view engine","ejs");


app.get("/",(req,res)=>{
    res.render("index.ejs");
});




app.listen(PORT,(req,res) => {
    console.log(`"Listening to port: ${PORT}"`);
});









