const mysql = require("mysql");

function getMySQLConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Programer25@",
        database: "code_academy"
    });
}

exports.getMySQLConnection = getMySQLConnection;