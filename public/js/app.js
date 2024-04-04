document.addEventListener("DOMContentLoaded", () => {
  const latestBlockElement = document.getElementById("latest-block");
  const latestHashElement = document.getElementById("latest-hash");
  const stateRootElement = document.getElementById("state-root");
  const latestBlockDetailElement = document.getElementById(
    "latest-block-detail"
  );
  const latestTXElement = document.getElementById("latest-tx");

  // 블록 정보를 가져와서 화면에 표시하는 함수
  function fetchLatestBlockInfo() {
    // 여기에 백엔드에서 정보를 가져오는 코드 작성
  }

  // 검색 버튼 이벤트 리스너
  document.querySelector("#search button").addEventListener("click", () => {
    // 검색 로직을 구현
  });

  // 초기 데이터 로드
  fetchLatestBlockInfo();
});
