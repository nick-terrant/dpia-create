let dpias = [];
let currentDPIA = null;

// ... (keep the existing functions for createNewDPIA, updateDPIAList, showDPIAStep1, and handleStep1Submit)

function showDPIAStep2() {
    // ... (keep the existing showDPIAStep2 function)
    document.getElementById('dpiaStep2Form').onsubmit = handleStep2Submit;
}

function handleStep2Submit(e) {
    e.preventDefault();
    console.log("Handling Step 2 submission");
    currentDPIA.steps.step2 = {
        processingNature: document.getElementById('processingNature').value,
        processingScope: document.getElementById('processingScope').value,
        processingContext: document.getElementById('processingContext').value,
        processingPurposes: document.getElementById('processingPurposes').value
    };
    showDPIAStep3();
}

function showDPIAStep3() {
    console.log("Showing DPIA Step 3");
    document.getElementById('dpiaStep2').style.display = 'none';
    const step3Element = document.getElementById('dpiaStep3');
    step3Element.style.display = 'block';
    step3Element.innerHTML = `
        <h2>Step 3: Consultation process</h2>
        <form id="dpiaStep3Form">
            <div class="form-section">
                <h3>1. Describe the consultation process</h3>
                <p class="explanation">Consider how to consult with relevant stakeholders: describe when and how you will seek individuals' views – or justify why it's not appropriate to do so. Who else do you need to involve within your organisation? Do you need to ask your processors to assist? Do you plan to consult information security experts, or any other experts?</p>
                <textarea id="consultationProcess" required>${currentDPIA.steps.step3?.consultationProcess || ''}</textarea>
            </div>
            <button type="submit">Continue to Step 4</button>
        </form>
    `;
    document.getElementById('dpiaStep3Form').onsubmit = handleStep3Submit;
}

function handleStep3Submit(e) {
    e.preventDefault();
    console.log("Handling Step 3 submission");
    currentDPIA.steps.step3 = {
        consultationProcess: document.getElementById('consultationProcess').value
    };
    showDPIAStep4();
}

function showDPIAStep4() {
    console.log("Showing DPIA Step 4");
    document.getElementById('dpiaStep3').style.display = 'none';
    const step4Element = document.getElementById('dpiaStep4');
    step4Element.style.display = 'block';
    step4Element.innerHTML = `
        <h2>Step 4: Assess necessity and proportionality</h2>
        <form id="dpiaStep4Form">
            <div class="form-section">
                <h3>1. Describe compliance and proportionality measures</h3>
                <p class="explanation">What is your lawful basis for processing? Does the processing actually achieve your purpose? Is there another way to achieve the same outcome? How will you prevent function creep? How will you ensure data quality and data minimisation? What information will you give individuals? How will you help to support their rights? What measures do you take to ensure processors comply? How do you safeguard any international transfers?</p>
                <textarea id="necessityProportionality" required>${currentDPIA.steps.step4?.necessityProportionality || ''}</textarea>
            </div>
            <button type="submit">Save and Return to DPIA List</button>
        </form>
    `;
    document.getElementById('dpiaStep4Form').onsubmit = handleStep4Submit;
}

function handleStep4Submit(e) {
    e.preventDefault();
    console.log("Handling Step 4 submission");
    currentDPIA.steps.step4 = {
        necessityProportionality: document.getElementById('necessityProportionality').value
    };
    currentDPIA.status = 'completed';
    document.getElementById('dpiaStep4').style.display = 'none';
    document.getElementById('dpiaList').style.display = 'block';
    updateDPIAList();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    document.getElementById('createNewDPIA').addEventListener('click', createNewDPIA);
    updateDPIAList();
});
