let allTips = [];

// Run when page fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadTips();
  createAlphabetButtons();

  document
    .getElementById("search")
    .addEventListener("input", searchTips);
});

// Load JSON data (AJAX)
function loadTips() {
  const loading = document.getElementById("loading");

  // Show loading text
  loading.style.display = "block";

  fetch("JSON/data.json")
    .then(res => res.json())
    .then(data => {
      allTips = data;

      // Hide loading text
      loading.style.display = "none";

      // Display all tips
      renderTips(data);
    })
    .catch(err => {
      console.error("Error loading JSON:", err);

      loading.textContent = "❌ Failed to load data";
    });
}

// Render tips
function renderTips(data) {
  const container = document.getElementById("tips-container");
  const resultCount = document.getElementById("result-count");

  container.innerHTML = "";

  // Result count
  resultCount.textContent = `Found ${data.length} result(s)`;

  // No result
  if (data.length === 0) {
    container.innerHTML = `
      <p class="no-result">
        Search not found in the tips
      </p>
    `;
    return;
  }

  // Group by category
  const groupedData = {};

  data.forEach(tip => {

    // Create category array if not exist
    if (!groupedData[tip.category]) {
      groupedData[tip.category] = [];
    }

    // Push tip into category
    groupedData[tip.category].push(tip);
  });

  // Display grouped content
  for (const category in groupedData) {

    // Category title
    container.innerHTML += `
      <h2 class="category-title">
        ${category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
    `;

    // Tips under category
    groupedData[category].forEach(tip => {

      container.innerHTML += `
        <div class="tip-card">

          <img src="${tip.image}" alt="${tip.title}">

          <div>
            <h3>${tip.title}</h3>
            <p>${tip.content}</p>
          </div>

        </div>
      `;
    });
  }
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

// Create A-Z buttons
function createAlphabetButtons() {
  const alphabetContainer =
    document.getElementById("alphabet-buttons");

  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  letters.forEach(letter => {

    const button =
      document.createElement("button");

    button.textContent = letter;

    button.className = "alphabet-btn";

    // Click event
    button.addEventListener("click", () => {

      filterByLetter(letter);

      setActiveButton(button);
    });

    alphabetContainer.appendChild(button);
  });
}

// Filter by first letter
function filterByLetter(letter) {

  const filtered = allTips.filter(tip =>
    tip.category.toUpperCase().startsWith(letter)
  );

  renderTips(filtered);
}

// Active button style
function setActiveButton(activeButton) {

  const buttons =
    document.querySelectorAll(".alphabet-btn");

  buttons.forEach(button => {
    button.classList.remove("active");
  });

  activeButton.classList.add("active");
}