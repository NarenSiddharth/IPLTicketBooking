const express = require('express');

var connection = require('./database');

const path = require('path');
/*let sql = "Select * from matches";
connection.query(sql,function(err,results){
    if(err) throw err
    res.send(results);
});*/

const port = 8081;

const app = express();

app.use(express.static('public'));
app.use(express.json());

var __dirname = '/Users/narensiddharth/IPLTicketBooking-1';

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/home.html'));
})


app.post('/rev', function(req,res){
    const {hometeam, awayteam, stadium, stand, price, seats} = req.body;

    const id = 2;
    const username = "royo";
    const match_id = 1;
    const seat = seats[0];


    let sql = "Insert into reservation (reservation_id,user_name,match_id,stadium_name, stand,seat) values (?,?,?,?,?,?)";
    connection.query(sql, [id,username,match_id,stadium, stand,seat], function(err, results){
        if(err) throw err
        res.send(results);
    })
})

app.listen(port, () => {
    console.log("listening");
    connection.connect(function(err){
        if(err) throw err;
        console.log("Database connected");
    })
})


