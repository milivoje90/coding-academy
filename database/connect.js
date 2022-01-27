const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();


function getMySQLConnection() {
    return mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    });
}

exports.getMySQLConnection = getMySQLConnection;