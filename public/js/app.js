document.addEventListener("DOMContentLoaded", () => {
  const latestBlockElement = document.getElementById("latest-block");
  const latestHashElement = document.getElementById("latest-hash");
  const latestBlockHeaderMetadata = document.getElementById(
    "latest-block-detail"
  );
  const latestBlockAuthElement = document.getElementById("authority");
  const latestBlockRatifications =
    document.getElementById("ratifications_json");
  const abortTxElement = document.getElementById("abortTx");
  const stateRootElement = document.getElementById("state-root");
  const latestBlockTx = document.getElementById("latest-block-tx");
  const latestPeerAll = document.getElementById("peer-data");

  async function fetchLatestBlockInfo() {
    try {
      const response = await fetch("http://localhost:3000/dashboard");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blockData = await response.json();

      const response2 = await fetch("http://localhost:3000/block-peer");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const peerData = await response2.json();

      console.log("peerData", peerData);
      console.log("blockData", blockData, typeof blockData);

      console.log(
        "blockData.ratifications_json",
        blockData.ratifications_json,
        typeof blockData.ratifications_json
      );

      latestBlockElement.textContent =
        JSON.parse(blockData.metadata_json).height || "N/A";
      latestBlockTx.textContent = blockData.transactions_json || "N/A";
      latestBlockHeaderMetadata.textContent = blockData.metadata_json || "N/A";
      latestBlockAuthElement.textContent = blockData.authority_json || "N/A";
      latestBlockRatifications.textContent =
        blockData.ratifications_json || "N/A";
      latestHashElement.textContent = blockData.block_hash || "N/A";
      stateRootElement.textContent = blockData.previous_state_root || "N/A";
      abortTxElement.textContent =
        blockData.aborted_transaction_ids_json || "N/A";

      latestPeerAll.textContent = peerData.data || "N/A";
    } catch (error) {
      console.error("Error fetching latest block info:", error);
    }
  }

  // Add event listener to the search button
  document.querySelector("#search button").addEventListener("click", () => {
    // Implement the search functionality
  });

  // Load initial data
  fetchLatestBlockInfo();
});

//
