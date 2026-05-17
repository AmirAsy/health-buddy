const searchInput =
  document.getElementById("diseaseSearch");

const searchBtn =
  document.getElementById("searchBtn");

const diseaseResults =
  document.getElementById("diseaseResults");

const loadingText =
  document.getElementById("loading");

const resultCount =
  document.getElementById("result-count");

let localDiseaseData = [];

/* ---------- LOAD LOCAL JSON ---------- */

document.addEventListener("DOMContentLoaded", () => {

  fetch("JSON/disease.json")
    .then(response => response.json())
    .then(data => {
      localDiseaseData = data.contangent;

      searchInput.value = "a";
      searchDisease();
    })
    .catch(error => {
      console.error("Error loading disease.json:", error);
    });

});

/* ---------- SEARCH EVENTS ---------- */

searchBtn.addEventListener("click", searchDisease);

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    searchDisease();
  }
});

/* ---------- SEARCH FUNCTION ---------- */

function searchDisease() {

  const keyword =
    searchInput.value.trim();

  if (keyword === "") {
    diseaseResults.innerHTML = `
      <p class="no-result">
        Please enter a disease or condition keyword.
      </p>
    `;

    resultCount.textContent = "";
    return;
  }

  loadingText.textContent = "Loading disease data...";
  diseaseResults.innerHTML = "";
  resultCount.textContent = "";

  fetch(
    `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${encodeURIComponent(keyword)}`
  )
    .then(response => response.json())
    .then(data => {

      loadingText.textContent = "";

      const results = data[3];

      if (!results || results.length === 0) {
        diseaseResults.innerHTML = `
          <p class="no-result">
            No disease or condition found for "${keyword}".
          </p>
        `;
        return;
      }

      resultCount.textContent =
        `Found ${results.length} result(s) for "${keyword}"`;

      displayDiseaseResults(results);

    })
    .catch(error => {

      loadingText.textContent = "";

      diseaseResults.innerHTML = `
        <p class="no-result">
          Failed to load disease data.
          Please check your internet connection.
        </p>
      `;

      console.error("Error fetching API:", error);

    });
}

/* ---------- DISPLAY RESULTS ---------- */

function displayDiseaseResults(results) {

  diseaseResults.innerHTML = "";

  results.forEach(item => {

    const diseaseName = item[0];

    const match = localDiseaseData.find(dis =>
      dis.disease.toLowerCase() === diseaseName.toLowerCase()
    );

    const definitionInfo =
      match && match.definition !== ""
        ? match.definition
        : "Definition not found.";

    diseaseResults.innerHTML += `
      <div class="disease-card">

        <h2>${diseaseName}</h2>

        <p>
          <strong>Definition:</strong>
          ${definitionInfo}
        </p>

      </div>
    `;

  });
}