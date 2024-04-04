CREATE DATABASE aleo_local;

CREATE TABLE block_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  block_hash VARCHAR(255),
  previous_hash VARCHAR(255),
  previous_state_root VARCHAR(255),
  transactions_root VARCHAR(255),
  finalize_root VARCHAR(255),
  ratifications_root VARCHAR(255),
  solutions_root VARCHAR(255),
  subdag_root VARCHAR(255),
  metadata_json JSON,
  authority_json JSON,
  ratifications_json JSON,
  transactions_json JSON,
  aborted_transaction_ids_json JSON
);

CREATE TABLE peer_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data TEXT
);

