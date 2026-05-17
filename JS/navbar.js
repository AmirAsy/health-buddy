fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    const hamburgerBtn =
      document.getElementById("hamburgerBtn");

    const navMenu =
      document.getElementById("navMenu");

    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      if (navMenu.classList.contains("active")) {
        hamburgerBtn.textContent = "✕";
      }
      else {
        hamburgerBtn.textContent = "☰";
      }
    });
  });