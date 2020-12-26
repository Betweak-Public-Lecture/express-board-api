const mysql = require('mysql2');


const conn = mysql.createConnection({
  host: 'localhost', // or '127.0.0.1'
  port: 3306, // mysql default port
  user: 'root', // mysql user
  password: 'admin1234',
  database: 'express_board_simple' // Database(Schema) name
}) // 연결 하나 (only for 개발서버)

// const conn = mysql.createPool({}) //연결 여러개 (최대개수지정 및 관리)

module.exports = conn