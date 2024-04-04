const mysql = require("mysql");
require("dotenv").config(); // 맨 위에 추가해 환경변수를 로드합니다.

// const pool = mysql.createPool({
//   connectionLimit: process.env.DB_CONN_LIMIT || 10,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "qwe123!@#",
  database: "aleo_local",
});

module.exports = pool;
