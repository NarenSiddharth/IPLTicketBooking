var mysql = require("mysql2");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Naren362004@",
    database: "IplTicket"
});


module.exports = connection;