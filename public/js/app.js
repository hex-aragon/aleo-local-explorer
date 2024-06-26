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

  // 검색 버튼 클릭 이벤트 리스너 내에 있는 코드
  document
    .querySelector("#search button")
    .addEventListener("click", async () => {
      const searchInput = document.querySelector("#search input[type='text']");
      const searchTerm = searchInput.value; // 입력된 검색어 가져오기
      if (!searchTerm) {
        alert("Please enter a search term.");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3000/search?${searchTerm}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const searchData = await response.json();

        // 검색 결과를 화면에 표시하는 코드를 여기에 추가합니다.
        // 예시:
        document.querySelector("#search-result-header").textContent =
          "Search Result:";
        document.querySelector("#search-result-body").textContent =
          JSON.stringify(searchData, null, 2);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    });

  // Load initial data
  fetchLatestBlockInfo();
});

//
