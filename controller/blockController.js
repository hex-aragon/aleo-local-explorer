const blockService = require("../services/blockService");

const getDashboardData = async (req, res) => {
  try {
    const data = await blockService.fetchDashboardData();
    const peer_data = await blockService.getBlockPeerSerice;
    data.peer_data = peer_data;
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBlockHeader = async (req, res) => {
  try {
    const data = await blockService.getBlockHeaderService();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBlockAuth = async (req, res) => {
  try {
    const data = await blockService.getBlockAuthService();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBlockRatifications = async (req, res) => {
  try {
    const data = await blockService.getBlockRatificationsData();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBlockTx = async (req, res) => {
  try {
    const data = await blockService.getBlockTransactionService();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBlockAbortedTransactionIds = async (req, res) => {
  try {
    const data = await blockService.getBlockAbortedTransactionIdsData();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBlockPeer = async (req, res) => {
  try {
    const data = await blockService.getBlockPeerSerice();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getDashboardData,
  getBlockAuth,
  getBlockHeader,
  getBlockRatifications,
  getBlockAbortedTransactionIds,
  getBlockTx,
  getBlockPeer,
};
