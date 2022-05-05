require('dotenv').config();
const {HOST, USERS, PASSWORD, DATABASE,} = process.env;

// config/database.js
module.exports = {
    host     : HOST,
    user     : USERS,
    password : PASSWORD,
    database : DATABASE
  };