const express = require("express");
const mysql = require("mysql");
const fetch = require("node-fetch");
const cron = require("node-cron");

const app = express();
const port = 3030;

// MySQL 연결 설정
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database_name",
});

// API 끝점 설정
app.get("/dashboard", (req, res) => {
  // Dashboard 데이터 가져오기
});

app.get("/block-detail", (req, res) => {
  // Block detail 데이터 가져오기
});

app.get("/tx-detail", (req, res) => {
  // Transaction detail 데이터 가져오기
});

app.get("/program-detail", (req, res) => {
  // Program detail 데이터 가져오기
});

// MySQL 테이블에 데이터 삽입
const insertDataToDB = (data) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // 연결 중 오류가 있으면 에러를 던짐
    console.log("Connected as ID " + connection.threadId);

    // INSERT 쿼리 작성
    const sql = "INSERT INTO block_data SET ?";
    connection.query(sql, data, (err, results) => {
      connection.release(); // 연결 세션 반환
      if (err) throw err;
      console.log("Data inserted:", results.insertId);
    });
  });
};

// 외부 API에서 데이터 가져오고 DB에 삽입
cron.schedule("* * * * *", () => {
  // 매 분마다 실행되는 크론탭 작업
  fetch("http://localhost:3030/testnet3/latest/height")
    .then((response) => response.json())
    .then((data) => {
      // 가져온 데이터로 DB에 삽입할 객체 생성
      const blockData = {
        block_hash: data.block_hash,
        // ... 나머지 필드도 동일한 방식으로 매핑
      };
      insertDataToDB(blockData);
    })
    .catch((err) => console.error("Error fetching data:", err));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
