let allTips = [];

// Run when page fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadTips();

  document
    .getElementById("search")
    .addEventListener("input", searchTips);
});

// Fetch data (AJAX)
function loadTips() {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      allTips = data;
      renderTips(data);
    })
    .catch(err => console.error("Error loading JSON:", err));
}

// Render UI
function renderTips(data) {
  const container = document.getElementById("tips-container");
  container.innerHTML = "";

  data.forEach(tip => {
    const card = `
      <div class="tip-card">
        <img src="${tip.image}" alt="${tip.title}">
        <div>
          <h3>${tip.title}</h3>
          <p>${tip.content}</p>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// Search function
function searchTips(e) {
  const keyword = e.target.value.toLowerCase();

  const filtered = allTips.filter(tip =>
    tip.title.toLowerCase().includes(keyword) ||
    tip.category.toLowerCase().includes(keyword) ||
    tip.content.toLowerCase().includes(keyword)
  );

  renderTips(filtered);
}