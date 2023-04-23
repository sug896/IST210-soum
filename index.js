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

app.post('/createuser', function(request, res, next){
    console.log(request.body)
    
    var profile = request.body;
    var query = 'INSERT INTO `student` (`fName`, `lName`, `StudentID`, `email`) VALUES'; 
    query += '("'+profile.fName+'", '+'"'+ profile.lName + '"' +', "0000003", "sally896@psu.edu")';
    connecttion.query(query, function(error, response, fields){
    if (error) throw error;
        res.send(response);
    })
   
})

function orderForm(message){
    return `<!DOCTYPE html>
    <html>
    <head>
    <title>web app</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    </head>
    
        <body>
            <div class="container">
               <h1>Enter your order here</h1>
                <form action="/order/create" method="POST">
                <div class="row">
                    <div class="col-md">
                        <input class="form-control" type="number" name="itemNumber" placeholder="item number"/>
                    </div>
                    <div class="col-md">
                        <input class="form-control" type="number" name="itemQuantity" placeholder="quantity"/>
                    </div>
                    <div class="col-sm">
                        <input type="submit" class="btn btn-primary" value="submit">
                    </div>
                </form>
                <div class="col-lg">
                    ${message? 'Thank you for your order' : ''}
                </div>
            </div>
        </body>
    </html>`
}

app.get('/order', function(request, res, next){
    res.send(orderForm(request.query.sucess));
})

app.post('/order/create', function(req, res, next){
    var qty = req.body.itemQuantity;
    var itemCode = req.body.itemNumber;
    connecttion.connect(function(error, response){
        if (error) throw error;
        var query = `UPDATE items SET itemQuantity = ( itemQuantity -` + qty +`) WHERE itemCode = ` + itemCode;
        connecttion.query(query, function(error, response, fields){
            if (error) throw error;
            if(response.changedRows == 1){
                connecttion.end();
                res.redirect('/order?sucess=true');
            }
        });
    });
})

app.listen(port, function(){
    console.log('http://localhost:'+port)
})
