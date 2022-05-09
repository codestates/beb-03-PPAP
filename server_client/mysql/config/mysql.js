const mysql = require('mysql');
// const mysql = require('mysql');
const dbconfig = require('./config.js');
console.log(dbconfig);
const connection = mysql.createConnection(dbconfig);
connection.connect();

module.exports = connection;
