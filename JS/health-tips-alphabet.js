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

    button.addEventListener("click", () => {
      filterByLetter(letter);
      setActiveButton(button);
    });

    alphabetContainer.appendChild(button);
  });
}

function filterByLetter(letter) {
  const filtered = allTips.filter(tip =>
    tip.category.toUpperCase().startsWith(letter)
  );

  renderTips(filtered);
}

function setActiveButton(activeButton) {
  const buttons =
    document.querySelectorAll(".alphabet-btn");

  buttons.forEach(button => {
    button.classList.remove("active");
  });

  activeButton.classList.add("active");
}