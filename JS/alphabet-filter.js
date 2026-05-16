function createAlphabetButtons() {

  const alphabetContainer =
    document.getElementById("alphabet-buttons");

  /* ---------- ALL BUTTON ---------- */

  const allButton =
    document.createElement("button");

  allButton.textContent = "All";

  allButton.className =
    "alphabet-btn active";

  allButton.addEventListener("click", () => {

    renderTips(allTips);

    setActiveButton(allButton);

  });

  alphabetContainer.appendChild(allButton);

  /* ---------- A-Z BUTTONS ---------- */

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

/* ---------- FILTER ---------- */

function filterByLetter(letter) {

  const filtered = allTips.filter(tip =>

    tip.category
      .toUpperCase()
      .startsWith(letter)

  );

  renderTips(filtered);

}

/* ---------- ACTIVE BUTTON ---------- */

function setActiveButton(activeButton) {

  const buttons =
    document.querySelectorAll(".alphabet-btn");

  buttons.forEach(button => {

    button.classList.remove("active");

  });

  activeButton.classList.add("active");

}