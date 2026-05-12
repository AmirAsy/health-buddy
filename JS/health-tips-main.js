let allTips = [];

document.addEventListener("DOMContentLoaded", () => {
  loadTips();
  createAlphabetButtons();

  document
    .getElementById("search")
    .addEventListener("input", searchTips);
});

function loadTips() {
  const loading = document.getElementById("loading");

  loading.style.display = "block";

  fetch("JSON/data.json")
    .then(res => res.json())
    .then(data => {
      allTips = data;
      loading.style.display = "none";
      renderTips(data);
    })
    .catch(err => {
      console.error("Error loading JSON:", err);
      loading.textContent = "❌ Failed to load data";
    });
}