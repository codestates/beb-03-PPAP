const mysql = require("mysql");
const dbconfig = require("./config");
console.log(dbconfig);
const connection = mysql.createConnection(dbconfig);
connection.connect();

module.exports = connection;
