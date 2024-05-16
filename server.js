const express = require('express');

const mysql = require('mysql');

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Naren362004@",
    database : "IplTicket" 
});




const app = express();

app.get('/', function(req,res){
    let sql = "Select * from matches";
    db.query(sql,function(err,results){
        if(err) throw err
        res.send(results);
    });
})

app.listen(8081, () => {
    console.log("listening");
    db.connect(function(err){
        if(err) throw err;
        console.log("Database connected");
    })

})


