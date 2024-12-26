//install: node js
//install web server package: express >npm install express
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

//web root
server.use(express.static(__dirname));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(helmet());
server.use(cors());

const fileUpload = require("express-fileupload");
server.use(fileUpload({defCharset:'utf8', defParamCharset:'utf8'}));


const DB = require("nedb-promises");
const ProfolioDB = DB.create(__dirname+"/profolio.db");
const ContactDB = DB.create(__dirname+"/contact.db");
 

  /*ProfolioDB.insert([
    {modal:"card1",imgSrc:"picture/s1411122027材質.png",link:"3D_design.html",title:"3D design",text:"See More"},
    {modal:"card2",imgSrc:"picture/達悟族.png",link:"graphic_design.html",title:"graphic design",text:"See More"},
    {modal:"card3",imgSrc:"picture/S__9060369.png",link:"Something_else_here.html",title:"Something_else_here",text:"See More"}
])*/

/*server.get("/services", (req, res)=>{
    //DB find
    const Services=[
        {icon: "fa-shopping-cart", heading:"E-Commerce", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."},
        {icon: "fa-laptop", heading:"Responsive Design", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."}
    ];
    res.send(Services);
});*/

server.get("/profolio", (req,res)=>{
      //DB
      ProfolioDB.find({}).then(results=>{
        if(results != null){
             res.send(results);
        }else{
            res.send("Error!");
        }
      })
});

server.post("/contact_me", (req,res)=>{
     ContactDB.insert(req.body);
     res.redirect("/#contact");
});

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/main.html'));
  });

server.listen(2170, ()=>{
    console.log("Server is running at port 2170.");
});
