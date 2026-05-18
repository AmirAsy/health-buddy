const searchInput =
  document.getElementById("search");
const sortSelect =
  document.getElementById("sort-select");

/* ---------- SEARCH EVENT ---------- */

searchInput.addEventListener("input", applyFiltersAndSort);

/* ---------- SORT EVENT ---------- */

sortSelect.addEventListener("change", applyFiltersAndSort);

/* ---------- MAIN FUNCTION ---------- */

function applyFiltersAndSort() {

  const keyword =
    searchInput.value.toLowerCase();

  /* ---------- FILTER ---------- */

  let filtered = allTips.filter(tip =>

    tip.title.toLowerCase().includes(keyword) ||
    tip.category.toLowerCase().includes(keyword) ||
    tip.content.toLowerCase().includes(keyword)

  );

  /* ---------- SORTING ---------- */

  if (sortSelect.value === "az") {
    filtered.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

  }

  else if (sortSelect.value === "za") {
    filtered.sort((a, b) =>
      b.title.localeCompare(a.title)
    );

  }

  /* ---------- RENDER ---------- */

  renderTips(filtered);

}