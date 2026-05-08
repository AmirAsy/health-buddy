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
  const loading = document.getElementById("loading");

  // ✅ Show loading text
  loading.style.display = "block";
  
  fetch("JSON/data.json")
    .then(res => res.json())
    .then(data => {
      allTips = data;

      // ❌ Hide loading after data loaded
      loading.style.display = "none";
      
      renderTips(data);
    })
    .catch(err => {
      console.error("Error loading JSON:", err);
    
      loading.textContent = "❌ Failed to load data";
    });
}

// Render UI
function renderTips(data) {
  const container = document.getElementById("tips-container");
  const resultText = document.getElementById("result-count");
  container.innerHTML = "";

  // ✅ Show result count
  resultText.textContent = `Found ${data.length} result(s)`;

  // ✅ If no result found
  if (data.length === 0) {
    container.innerHTML = `
      <p class="no-result">
        ❌ Search not found in the tips
      </p>
    `;
    return;
  }

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