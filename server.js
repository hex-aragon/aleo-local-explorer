const express = require("express");
const app = express();
const port = 3030;

// 정적 파일 제공 설정
app.use(express.static("public"));

// body-parser 설정 (옵션)
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우트 설정
app.use(require("./src/routes"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
