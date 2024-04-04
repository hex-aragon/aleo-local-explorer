const express = require("express");
const app = express();
const port = 3000;
const blockService = require("./services/blockService"); // blockService 모듈 임포트

// 정적 파일 제공 설정
app.use(express.static("public"));

// body-parser 설정 (옵션)
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 서버 시작과 동시에 크론 작업 시작
blockService.scheduleDataFetching(); // 크론 작업 실행

// 라우트 설정
app.use(require("./src/routes"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
