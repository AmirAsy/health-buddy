fetch("font-size.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("font-size-controls").innerHTML = data;
  });