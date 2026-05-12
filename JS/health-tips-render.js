function renderTips(data) {
  const container = document.getElementById("tips-container");
  const resultCount = document.getElementById("result-count");

  container.innerHTML = "";

  resultCount.textContent = `Found ${data.length} result(s)`;

  if (data.length === 0) {
    container.innerHTML = `
      <p class="no-result">
        Search not found in the tips
      </p>
    `;
    return;
  }

  const groupedData = {};

  data.forEach(tip => {
    if (!groupedData[tip.category]) {
      groupedData[tip.category] = [];
    }

    groupedData[tip.category].push(tip);
  });

  for (const category in groupedData) {
    container.innerHTML += `
      <h2 class="category-title">
        ${category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
    `;

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