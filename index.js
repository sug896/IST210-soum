var mysql = require('mysql');
var express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded());
var port = 3000;

var connecttion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'IST210',
    port: 8889
})
var query1 = 'SELECT * FROM student';
var query2 = 'INSERT INTO `student` (`fName`, `lName`, `StudentID`, `email`) VALUES ("sally", "smith", "0000003", "sally896@psu.edu")';
connecttion.connect();

app.post('/createuser', function(request, res, next){
    var profile = JSON.parse(request);
    var query = 'INSERT INTO `student` (`fName`, `lName`, `StudentID`, `email`) VALUES'; 
    query += '('+profile.fName+', ' + profile.lName+', "0000003", "sally896@psu.edu")';
    connecttion.query(query2, function(error, response, fields){
    if (error) throw error;
        res.send(response);
    })
   
})

app.listen(port, function(){
    console.log('http://localhost:'+port)
})

//https://console.pingone.com/index.html?env=024c120b-895d-4b97-986f-e883c2e47515#/a349b0aa-c57c-4c9c-a047-8f261441ef93/overviewDashboard