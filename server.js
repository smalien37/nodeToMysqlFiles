const express = require('express')
let path = require('path');
const formidable = require('formidable');
const cors = require('cors');

const app = express()

app.use(cors())

const mysql = require('mysql') //mysql2 is preferable if any error related to AUTH_MODE
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'login',
  database: 'test_db'
})


//This is a small change


app.get('/get', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.post('/upload',express.json(), (req, res) => {


  connection.query("INSERT INTO `test_db`.`data` (`email`,`name`) VALUES ('"+req.body.email+"','"+req.body.name+"')")
  console.log("data putted is wrong : "+req.body.email+" and "+req.body.name)



  return res.json(req.body);
});



app.post('/upload_data_b', (req, res) => {



  const form = new formidable.IncomingForm();
  
  form.parse(req, function(err, fields, files) {
  
    const [firstFileName] = Object.keys(files);
    connection.query("UPDATE `test_db`.`data` SET `file_b` = '"+files+"' ORDER BY id DESC LIMIT 1")

    console.log("data b:"+firstFileName+" inserted")
    res.json({ filename: firstFileName });
   
  });

});


app.post('/upload_data_a', (req, res) => {



  const form = new formidable.IncomingForm();
  
  form.parse(req, function(err, fields, files) {
  
    const [firstFileName] = Object.keys(files);
    // connection.query("INSERT INTO `test_db`.`data` (`file_a`) VALUES ('"+files+"')")
    connection.query("UPDATE `test_db`.`data` SET `file_a` = '"+files+"' ORDER BY id DESC LIMIT 1")
    console.log("data a:"+firstFileName+" inserted")

    res.json({ filename: firstFileName });

  });

});


  app.listen(1234, () => {
    console.log(`Example app listening on port 1234`)
  })
