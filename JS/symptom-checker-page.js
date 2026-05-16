async function showResults() {
    // Gather selected symptoms
    const checkboxes = document.querySelectorAll('.symptom-checkbox:checked');
    let selectedSymptoms = [];
    
    checkboxes.forEach((box) => {
        selectedSymptoms.push(box.value);
    });

    const resultBox = document.getElementById('result-display');
    
    if (selectedSymptoms.length === 0) {
        resultBox.innerHTML = "<div style='text-align:center; width:100%; color: #666;'>Please select a symptom.</div>";
        return; // Stop the function here if nothing is selected
    }

    // HTML output setup
    let outputHTML = `<strong>Symptoms noted:</strong> ${selectedSymptoms.join(", ")}<br><br>`;
    
    // Show a loading state while waiting for the API
    resultBox.innerHTML = outputHTML + "<strong>Loading possible conditions...</strong>";

    // Most simple APIs take one symptom parameter at a time. 
    // We will use the first selected symptom as the primary search keyword.
    const primarySymptom = selectedSymptoms[0].toLowerCase();

    // Set up your RapidAPI credentials
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8401311726msh6066fcaa60dd73fp13902cjsn09db5efc56fe', 
            'X-RapidAPI-Host': 'healthwise.p.rapidapi.com'
        }
    };

    try {
        // Fetch data from the API
        const response = await fetch(`https://healthwise.p.rapidapi.com/diseases?symptom=${primarySymptom}`, options);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();

        outputHTML += "<strong>Possible conditions:</strong>";
        outputHTML += "<ul style='margin-top: 5px;'>";
        
        // Check if the API returned any diseases
        if (data && data.length > 0) {
            // Loop through matches and create list items
            // Note: You may need to change 'disease.name' to exactly match the API's JSON format
            data.forEach(disease => {
                const conditionName = disease.name || disease.disease || disease; 
                outputHTML += `<li>${conditionName}</li>`;
            });
        } else {
            outputHTML += "<li>No specific match found in the database. Please consult a healthcare professional.</li>";
        }
        
        outputHTML += "</ul>";
        outputHTML += "<br><span style='font-size: 14px; color: #d9534f;'><em>*Disclaimer: This is for educational purposes. Please consult a doctor for an accurate diagnosis.</em></span>";
        
        // Display final output
        resultBox.innerHTML = outputHTML;

    } catch (error) {
        console.error("Error fetching data from HealthWise:", error);
        resultBox.innerHTML = outputHTML + "<br><span style='color: #d9534f;'>Sorry, there was an error communicating with the symptom database. Please try again later.</span>";
    }
}