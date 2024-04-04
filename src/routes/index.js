const express = require("express");
const router = express.Router();
const blockController = require("../../controller/blockController");

router.get("/dashboard", blockController.getDashboardData);
router.get("/block-header", blockController.getBlockHeader);
router.get("/block-auth", blockController.getBlockAuth);
router.get("/block-ratification", blockController.getBlockRatifications);
router.get("/block-tx", blockController.getBlockTx);
router.get("/abort-tx", blockController.getBlockAbortedTransactionIds);
router.get("/block-peer", blockController.getBlockPeer);

module.exports = router;
