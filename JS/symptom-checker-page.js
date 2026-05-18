
let symptomDatabase = []; 

fetch('JSON/symptom.json')
    .then(response => response.json())
    .then(data => {
        symptomDatabase = data; 
    })
    .catch(error => console.error("Error loading JSON database:", error));


function showResults() {
    const resultBox = document.getElementById('result-display');
    const checkboxes = document.querySelectorAll('.symptom-checkbox:checked');
    
    // Safety check 1: Did they check any boxes?
    if (checkboxes.length === 0) {
        resultBox.innerHTML = '<div style="text-align:center; width:100%; color: #666;">Please select at least one symptom first.</div>';
        return;
    }

    // Safety check 2: Did the database load?
    if (symptomDatabase.length === 0) {
        resultBox.innerHTML = '<div style="text-align:center; width:100%; color: red;">Error: Database not loaded.</div>';
        return;
    }

    // Collect lists of conditions for EVERY checked symptom
    let allMatchedArrays = [];

    checkboxes.forEach(box => {
        const match = symptomDatabase.find(item => item.symptom === box.value);
        if (match) {
            allMatchedArrays.push(match.conditions);
        }
    });

    //filter
    //assuming the conditions from the FIRST checked box are our baseline
    let finalConditions = allMatchedArrays[0];

    // loop through the remaining boxes user checked
    for (let i = 1; i < allMatchedArrays.length; i++) {
        // We filter our baseline list. We only keep a disease if it ALSO appears in the next box's list!
        finalConditions = finalConditions.filter(disease => allMatchedArrays[i].includes(disease));
    }

    // If no disease is found
    if (finalConditions.length === 0) {
        resultBox.innerHTML = '<div style="text-align:center; width:100%; color: #666;">Unfortunately, your symptoms does not match any disease in our database,please refer to a doctor.</div>';
        return;
    }

    // Print the final results
    resultBox.innerHTML = `
        <h3 style="margin-top:0;">Possible Conditions:</h3>
        <ul style="padding-left: 20px; text-align: left; line-height: 1.6;">
            <li>${finalConditions.join("</li><li>")}</li>
        </ul>
        <p style="color: red; font-size: 13px; margin-top: auto; padding-top: 20px; font-weight: bold;">
            *Disclaimer: This website is for educational purposes only. Please consult a doctor.*
        </p>
    `;
}

function resetChecker() {
    // Uncheck all the boxes
    const checkboxes = document.querySelectorAll('.symptom-checkbox');
    checkboxes.forEach(box => box.checked = false);
    
    // Reset the text in the result box to its default state
    const resultBox = document.getElementById('result-display');
    resultBox.innerHTML = '<div style="text-align:center; width:100%; color: #666;">Select your symptoms and click "Show Results"</div>';
}