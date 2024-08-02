// ... (previous code remains the same)

function showDPIAStep1(dpia) {
  fetchFirestoreData();
  currentDPIA = dpia;
  
  // Hide all other sections
  document.getElementById('dpiaList').classList.add('hidden');
  document.getElementById('dpiaStep2').classList.add('hidden');
  document.getElementById('dpiaStep3').classList.add('hidden');
  document.getElementById('dpiaStep4').classList.add('hidden');
  
  // Show Step 1
  const step1Element = document.getElementById('dpiaStep1');
  step1Element.classList.remove('hidden');
  
  step1Element.innerHTML = `
    <h2>Step 1: Identify the need for a DPIA</h2>
    <form id="dpiaStep1Form">
      <div class="form-section">
        <h3>1. What does the project aim to achieve?</h3>
        <p class="explanation">Explain broadly what the project aims to achieve and what type of processing it involves.</p>
        <textarea id="projectAims" required>${dpia.steps?.step1?.projectAims || ''}</textarea>
      </div>
      <!-- ... (rest of the form remains the same) ... -->
      <button type="submit" class="primary-button">Continue to Step 2</button>
    </form>
  `;
  
  document.getElementById('dpiaStep1Form').onsubmit = handleStep1Submit;
}

function showDPIAStep2() {
  console.log("Showing DPIA Step 2");
  
  // Hide all other sections
  document.getElementById('dpiaList').classList.add('hidden');
  document.getElementById('dpiaStep1').classList.add('hidden');
  document.getElementById('dpiaStep3').classList.add('hidden');
  document.getElementById('dpiaStep4').classList.add('hidden');
  
  // Show Step 2
  const step2Element = document.getElementById('dpiaStep2');
  step2Element.classList.remove('hidden');
  
  step2Element.innerHTML = `
    <h2>Step 2: Describe the processing</h2>
    <form id="dpiaStep2Form">
      <!-- ... (form content remains the same) ... -->
    </form>
  `;
  
  document.getElementById('dpiaStep2Form').onsubmit = handleStep2Submit;
}

function showDPIAStep3() {
  console.log("Showing DPIA Step 3");
  
  // Hide all other sections
  document.getElementById('dpiaList').classList.add('hidden');
  document.getElementById('dpiaStep1').classList.add('hidden');
  document.getElementById('dpiaStep2').classList.add('hidden');
  document.getElementById('dpiaStep4').classList.add('hidden');
  
  // Show Step 3
  const step3Element = document.getElementById('dpiaStep3');
  step3Element.classList.remove('hidden');
  
  step3Element.innerHTML = `
    <h2>Step 3: Consultation process</h2>
    <form id="dpiaStep3Form">
      <!-- ... (form content remains the same) ... -->
    </form>
  `;
  
  document.getElementById('dpiaStep3Form').onsubmit = handleStep3Submit;
}

function showDPIAStep4() {
  console.log("Showing DPIA Step 4");
  
  // Hide all other sections
  document.getElementById('dpiaList').classList.add('hidden');
  document.getElementById('dpiaStep1').classList.add('hidden');
  document.getElementById('dpiaStep2').classList.add('hidden');
  document.getElementById('dpiaStep3').classList.add('hidden');
  
  // Show Step 4
  const step4Element = document.getElementById('dpiaStep4');
  step4Element.classList.remove('hidden');
  
  step4Element.innerHTML = `
    <h2>Step 4: Assess necessity and proportionality</h2>
    <form id="dpiaStep4Form">
      <!-- ... (form content remains the same) ... -->
    </form>
  `;
  
  document.getElementById('dpiaStep4Form').onsubmit = handleStep4Submit;
}

async function handleStep4Submit(e) {
  e.preventDefault();
  console.log("Handling Step 4 submission");
  try {
    if (!currentDPIA || !currentDPIA.id) {
      throw new Error("No current DPIA or DPIA ID is missing");
    }

    currentDPIA.steps.step4 = {
      necessityProportionality: document.getElementById('necessityProportionality').value
    };
    
    await db.collection("dpias").doc(currentDPIA.id).update({
      "steps.step4": currentDPIA.steps.step4,
      status: 'completed'
    });
    
    console.log("Step 4 data saved successfully");
    alert("DPIA completed successfully!");
    
    // Hide Step 4 and show DPIA list
    document.getElementById('dpiaStep4').classList.add('hidden');
    document.getElementById('dpiaList').classList.remove('hidden');
    
    await updateDPIAList();
  } catch (error) {
    console.error("Error in handleStep4Submit:", error);
    logToPage("Error in handleStep4Submit: " + error.message);
    alert("An error occurred while completing the DPIA. Please try again.");
  }
}

// ... (rest of the code remains the same)
