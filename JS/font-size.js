// 1. Set the starting size
let currentFontSize = 100;

// 2. The function that gets called when a button is clicked
function adjustFontSize(action) {
    const step = 10;     // How much to change per click
    const minSize = 80;  // Minimum zoom limit
    const maxSize = 160; // Maximum zoom limit

    // 3. Do the math based on which button was clicked
    if (action === 'increase' && currentFontSize < maxSize) {
        currentFontSize += step;
    } else if (action === 'decrease' && currentFontSize > minSize) {
        currentFontSize -= step;
    } else if (action === 'reset') {
        currentFontSize = 100;
    }
    
    // 4. Apply the new zoom level to the entire webpage
    document.body.style.zoom = currentFontSize + "%";
}