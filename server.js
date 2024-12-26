//install: node js
//install web server package: express >npm install express
var express = require("express");
var server = express();
var path = require("path");

//web root
server.use(express.static(__dirname));


var fileUpload = require("express-fileupload");
server.use(fileUpload({defCharset:'utf8', defParamCharset:'utf8'}));


var DB = require("nedb-promises");
var ProfolioDB = DB.create(__dirname+"/profolio.db");
var ContactDB = DB.create(__dirname+"/contact.db");
 
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
 ProfolioDB.insert([
    {modal:"part1",imgSrc:"picture/s1411122027材質.png",link:"3D_design.html",title:"3D design",text:"See More"},
    {modal:"part2",imgSrc:"picture/達悟族.png",link:"graphic_design.html",title:"graphic design",text:"See More"},
    {modal:"part3",imgSrc:"picture/S__9060369.png",link:"Something_else_here.html",title:"Something_else_here",text:"See More"}
])

server.get("/services", (req, res)=>{
    //DB find
    var Services=[
        {icon: "fa-shopping-cart", heading:"E-Commerce", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."},
        {icon: "fa-laptop", heading:"Responsive Design", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."}
    ];
    res.send(Services);
});

server.get("/profolio", (req,res)=>{
      //DB
      ProfolioDB.find({}).then(results=>{
        if(results != null){
             res.send(results);
        }else{
            res.send("Error!");
        }
      })
})

server.post("/contact_me", (req,res)=>{
     ContactDB.insert(req.body);
     res.redirect("/#contact");
})

server.listen(80, ()=>{
    console.log("Server is running at port 80.");
})

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/main.html'));
  });