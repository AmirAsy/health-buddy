 function showResults() {
        // Gather selected symptoms
        const checkboxes = document.querySelectorAll('.symptom-checkbox:checked');
        let selectedSymptoms = [];
        
        checkboxes.forEach((box) => {
            selectedSymptoms.push(box.value);
        });

        const otherInput = document.getElementById('other-symptom').value.trim();
        if (otherInput !== "") {
            selectedSymptoms.push(otherInput);
        }

        const resultBox = document.getElementById('result-display');
        
        if (selectedSymptoms.length === 0) {
            resultBox.innerHTML = "<div style='text-align:center; width:100%;'>Please select or type a symptom.</div>";
            return; // Stop the function here if nothing is selected
        }

        // Simple Disease Database
        const diseaseDatabase = [
            { name: "Common Cold", symptoms: ["Coughing", "Runny Nose"] },  
            { name: "Flu (Influenza)", symptoms: ["Fever", "Headache", "Fatigue", "Chills"] },
            { name: "COVID-19", symptoms: ["Fever", "Coughing", "Fatigue"] },
            { name: "Migraine", symptoms: ["Headache", "Nausea"] },
            { name: "Food Poisoning", symptoms: ["Nausea", "Fever", "Chills"] },
            { name: "Allergies", symptoms: ["Runny Nose", "Coughing"] }
        ];

        let possibleConditions = [];

       // Match symptoms to diseases
        diseaseDatabase.forEach(disease => {
            let matchFound = false;
            
            // If the user selected a symptom that exists in this disease's array
            disease.symptoms.forEach(symp => {
                if(selectedSymptoms.includes(symp)) {
                    matchFound = true;
                }
            });

            if (matchFound) {
                possibleConditions.push(disease.name);
            }
        });

        // HTML output for the Result Box
        let outputHTML = `<strong>Symptoms noted:</strong> ${selectedSymptoms.join(", ")}<br><br>`;
        
        if (possibleConditions.length > 0) {
            outputHTML += "<strong>Possible conditions:</strong>";
            outputHTML += "<ul style='margin-top: 5px;'>";
            
            // Loop through matches and create list items
            possibleConditions.forEach(condition => {
                outputHTML += `<li>${condition}</li>`;
            });
            
            outputHTML += "</ul>";
            outputHTML += "<br><span style='font-size: 14px; color: #d9534f;'><em>*Disclaimer: This is for educational purposes. Please consult a doctor for an accurate diagnosis.</em></span>";
        } else {
            outputHTML += "<strong>Possible conditions:</strong><br>No specific match found in our database. Please consult a healthcare professional.";
        }

        
        resultBox.innerHTML = outputHTML;
 }