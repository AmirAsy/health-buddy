const searchInput = document.getElementById("diseaseSearch");
const searchBtn = document.getElementById("searchBtn");
const diseaseResults = document.getElementById("diseaseResults");
const loadingText = document.getElementById("loading");
const resultCount = document.getElementById("result-count");

searchBtn.addEventListener("click", searchDisease);

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    searchDisease();
  }
});

function searchDisease() {
  const keyword = searchInput.value.trim();

  if (keyword === "") {
    diseaseResults.innerHTML = `
      <p class="no-result">Please enter a disease or symptom keyword.</p>
    `;
    resultCount.textContent = "";
    return;
  }

  loadingText.textContent = "Loading data...";
  diseaseResults.innerHTML = "";
  resultCount.textContent = "";

  fetch(`https://ontology.jax.org/api/hp/search?q=${keyword}`)
    .then(response => response.json())
    .then(data => {
      loadingText.textContent = "";

      const terms = data.terms;

      if (!terms || terms.length === 0) {
        diseaseResults.innerHTML = `
          <p class="no-result">No result found for "${keyword}".</p>
        `;
        return;
      }

      resultCount.textContent =
        `Found ${terms.length} result(s) for "${keyword}"`;

      displayDiseaseResults(terms);
    })
    .catch(error => {
      loadingText.textContent = "";

      diseaseResults.innerHTML = `
        <p class="no-result">
          Failed to load data. Please check your internet connection.
        </p>
      `;

      console.error("Error fetching API:", error);
    });
}

function displayDiseaseResults(terms) {
  diseaseResults.innerHTML = "";

  terms.forEach(term => {
    diseaseResults.innerHTML += `
      <div class="disease-card">
        <h2>${term.name}</h2>

        <p class="disease-id">
          ID: ${term.id}
        </p>

        <p>
          ${term.definition || "No definition available."}
        </p>
      </div>
    `;
  });
}