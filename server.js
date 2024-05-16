const express = require('express');

const mysql = require('mysql');

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Naren362004@"

})


const app = express();

app.listen(8081, () => {
    console.log("listening")

})


