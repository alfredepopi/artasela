const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

// MYSQL
var mysql = require('mysql');

var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "Alfred93300",
   database: "node"
 });

 con.connect(function(err) {
   if (err) throw err;
   console.log("Connected to MySQL!");
 });

 app.set('views',path.join(__dirname,'views'));
 app.use(bodyParser.urlencoded({ extended: false}));
 app.set("view engine", "ejs");
 app.use(express.json());
 app.use(express.static(__dirname + '/css'));
 app.use(express.static(__dirname + '/js'));
 app.get('/contact',(req, res) => {
  res.render('contact', {
      title : 'Contact',
  });
});



//Start listening the server
app.listen(5000);
console.log("Server started");

//Import Routes
app.post('/users', async (req, res) => {

  const civilité = req.body.civilite;
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const email = req.body.email;
  const adress = req.body.adress;
  const postal = req.body.postal;
  const ville = req.body.ville;
  const pays = req.body.pays;
  const proffesion = req.body.proffesion;
  const message = req.body.message;

  var sql = "INSERT INTO users (civilite, prenom, nom, email, adress, postal, ville, pays, proffesion, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

  con.query(sql, [civilité, prenom, nom, email, adress, postal, ville, pays, proffesion, message], (err, result) => {
      if (err) {
        console.log(err);
      }
      else
      res.status(200);
      res.redirect('/contact')
  console.log("1 record inserted");
  });
 
})

app.get('/users', async (req,res) => {
  var sql = 'SELECT * FROM users';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render('formulaire',{title:"User List", users:result});
  });
 });

 app.get('/users/:userId',(req, res) => {
  const userId = req.params.userId;
  let sql = `Select * from users where id = ${userId}`;
  let query = con.query(sql,(err, result) => {
      if(err) throw err;
      res.render('info', {
          title : 'Profile',
          user : result[0]
      });
  });
});
