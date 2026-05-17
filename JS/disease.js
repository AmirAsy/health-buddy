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

/* ---------- SEARCH EVENTS ---------- */

searchBtn.addEventListener("click", searchDisease);

searchInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {

    searchDisease();

  }

});

/* ---------- AUTO LOAD ---------- */

document.addEventListener("DOMContentLoaded", () => {

  searchInput.value = "a";

  searchDisease();

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

  loadingText.textContent =
    "Loading disease data...";

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

      console.error(
        "Error fetching API:",
        error
      );

    });


}

/* ---------- DISPLAY RESULTS ---------- */

function displayDiseaseResults(results) {

  diseaseResults.innerHTML = "";

  results.forEach(item => {

    let definitionInfo = "";
    const diseaseName =
      item[0];

    fetch('disease.json')
      .then(response => response.json())
      .then(data => {

      const match = data.contangent.find(dis =>
      dis.disease === diseaseName
      );

     if (match) {
        definitionInfo = dis.definition;
      } else {
        definitionInfo = 'Definition not found';
     }

    });

    diseaseResults.innerHTML += `

      <div class="disease-card">

        <h2>${diseaseName}</h2>

        <p>
          ${definitionInfo}
        </p>

      </div>

    `;

  });

}