const pool = require("../config/database"); // 데이터베이스 설정을 임포트

const getLatestBlockData = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM block_data ORDER BY id DESC LIMIT 1",
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

const getBlockHeaderData = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id,block_hash, previous_hash, previous_state_root,transactions_root,finalize_root,ratifications_root,solutions_root, subdag_root, metadata_json FROM block_data ORDER BY id DESC LIMIT 1",
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

const getBlockAuthData = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "select authority_json from block_data limit 1",
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

const getBlockRatificationsData = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "select ratifications_json from block_data limit 1",
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

const getBlockTxData = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "select transactions_json from block_data limit 1",
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

const getBlockAbortedTransactionIdsData = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "select aborted_transaction_ids_json from block_data limit 1",
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

const insertBlockData = (blockData) => {
  return new Promise((resolve, reject) => {
    const query = `
        INSERT INTO block_data (
          block_hash,
          previous_hash,
          previous_state_root,
          transactions_root,
          finalize_root,
          ratifications_root,
          solutions_root,
          subdag_root,
          metadata_json,
          authority_json,
          ratifications_json,
          transactions_json,
          aborted_transaction_ids_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

    const values = [
      blockData.block_hash,
      blockData.previous_hash,
      blockData.header.previous_state_root,
      blockData.header.transactions_root,
      blockData.header.finalize_root,
      blockData.header.ratifications_root,
      blockData.header.solutions_root,
      blockData.header.subdag_root,
      JSON.stringify(blockData.header.metadata),
      JSON.stringify(blockData.authority),
      JSON.stringify(blockData.ratifications),
      JSON.stringify(blockData.transactions),
      JSON.stringify(blockData.aborted_transaction_ids),
    ];

    pool.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.insertId);
    });
  });
};

module.exports = {
  getLatestBlockData,
  getBlockHeaderData,
  insertBlockData,
  getBlockAuthData,
  getBlockRatificationsData,
  getBlockAbortedTransactionIdsData,
  getBlockTxData,
};
