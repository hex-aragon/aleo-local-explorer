const fetch = require("node-fetch");
const cron = require("node-cron");
const blockModel = require("../src/models/blockModel");

const fetchDashboardData = async () => {
  try {
    const data = await blockModel.getLatestBlockData();
    console.log("data", data);

    return blockModel.getLatestBlockData();
  } catch (e) {
    throw e;
  }
};

const getBlockHeaderService = async () => {
  try {
    const data = await blockModel.getBlockHeaderData();
    console.log("data", data);

    return blockModel.getBlockHeaderData();
  } catch (e) {
    throw e;
  }
};

const getBlockAuthService = async () => {
  try {
    const data = await blockModel.getBlockAuthData();
    console.log("data", data);

    return blockModel.getBlockAuthData();
  } catch (e) {
    throw e;
  }
};

const getBlockRatificationsService = async () => {
  try {
    const data = await blockModel.getBlockRatificationsData();
    console.log("data", data);

    return blockModel.getBlockRatificationsData();
  } catch (e) {
    throw e;
  }
};

const getBlockTransactionService = async () => {
  try {
    const data = await blockModel.getBlockTxData();
    console.log("data", data);

    return blockModel.getBlockTxData();
  } catch (e) {
    throw e;
  }
};

const getBlockAbortedTransactionIdsSerice = async () => {
  try {
    const data = await blockModel.getBlockAbortedTransactionIdsData();
    console.log("data", data);

    return blockModel.getBlockAbortedTransactionIdsData();
  } catch (e) {
    throw e;
  }
};

// 주기적인 작업 설정
const scheduleDataFetching = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const response = await fetch(
        "http://localhost:3030/testnet3/latest/block"
      );
      const blockData = await response.json();
      await blockModel
        .insertBlockData(blockData)
        .then((insertId) => {
          console.log(`Inserted block data with id: ${insertId}`);
        })
        .catch((error) => {
          console.error("Error inserting block data:", error);
        });

      console.log("Data fetched and inserted at:", new Date());
      console.log("done", blockData);
      console.log("block_num me", typeof blockData);
      console.log("block_num me", typeof response);

      console.log(blockData.metadata_json, typeof blockData.metadata_json);
      console.log(JSON.stringify(blockData));
      blockData_json = JSON.stringify(blockData);
      console.log(typeof blockData_json);
      let block_num = JSON.parse(blockData_json.metadata);
      console.log("block_num", block_num);

      //let block_num = JSON.parse(blockData.metadata).height;
      // const mempool_response = await fetch(
      //   "http://localhost:3030/testnet3/latest/block"
      // );
      // const mempool_tx = await mem_pool_response.json();
      // await blockModel
      //   .insertBlockData(blockData)
      //   .then((insertId) => {
      //     console.log(`Inserted block data with id: ${insertId}`);
      //   })
      //   .catch((error) => {
      //     console.error("Error inserting block data:", error);
      //   });

      // console.log("Data fetched and inserted at:", new Date());
      // console.log("done", blockData);
    } catch (error) {
      console.error("Error fetching and inserting data:", error);
    }
  });
};

module.exports = {
  fetchDashboardData,
  scheduleDataFetching,
  getBlockHeaderService,
  getBlockAuthService,
  getBlockRatificationsService,
  getBlockAbortedTransactionIdsSerice,
  getBlockTransactionService,
};
