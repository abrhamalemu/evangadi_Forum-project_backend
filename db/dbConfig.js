require("dotenv").config();
const mysql = require("mysql2");

const dbConnection = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

module.exports = dbConnection.promise();
