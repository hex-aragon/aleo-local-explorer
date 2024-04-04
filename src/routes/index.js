const express = require("express");
const router = express.Router();

// Dashboard API
router.get("/dashboard", (req, res) => {
  res.send("Dashboard data");
});

// 기타 API 끝점 ...

module.exports = router;
