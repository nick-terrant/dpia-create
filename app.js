let dpias = [];
let currentDPIA = null;

function createNewDPIA() {
    console.log("Creating new DPIA");
    const newDPIA = { id: Date.now(), status: 'draft', steps: {} };
    dpias.push(newDPIA);
    updateDPIAList();
    showDPIAStep1(newDPIA);
}

function updateDPIAList() {
    console.log("Updating DPIA list");
    const listElement = document.getElementById('dpiaListItems');
    listElement.innerHTML = '';
    dpias.forEach(dpia => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = `DPIA ${dpia.id} - ${dpia.status}`;
        button.onclick = () => showDPIAStep1(dpia);
        li.appendChild(button);
        listElement.appendChild(li);
    });
}

function showDPIAStep1(dpia) {
    console.log("Showing DPIA Step 1", dpia);
    currentDPIA = dpia;
    document.getElementById('dpiaList').style.display = 'none';
    const step1Element = document.getElementById('dpiaStep1');
    step1Element.style.display = 'block';
    step1Element.innerHTML = `
        <h2>Step 1: Identify the need for a DPIA</h2>
        <form id="dpiaStep1Form">
            <div class="form-section">
                <h3>1. What does the project aim to achieve?</h3>
                <p class="explanation">Explain broadly what the project aims to achieve and what type of processing it involves.</p>
                <textarea id="projectAims" required>${dpia.steps.step1?.projectAims || ''}</textarea>
            </div>
            <div class="form-section">
                <h3>2. What type of processing does it involve?</h3>
                <p class="explanation">Describe the nature of the processing. How will you collect, use, store and delete data?</p>
                <textarea id="processingType" required>${dpia.steps.step1?.processingType || ''}</textarea>
            </div>
            <div class="form-section">
                <h3>3. What is the source of the data?</h3>
                <input type="text" id="dataSource" required value="${dpia.steps.step1?.dataSource || ''}">
            </div>
            <div class="form-section">
                <h3>4. Why did you identify the need for a DPIA?</h3>
                <p class="explanation">Summarise why you identified the need for a DPIA.</p>
                <textarea id="dpiaJustification" required>${dpia.steps.step1?.dpiaJustification || ''}</textarea>
            </div>
            <button type="submit">Continue to Step 2</button>
        </form>
    `;
    document.getElementById('dpiaStep1Form').onsubmit = handleStep1Submit;
}

function handleStep1Submit(e) {
    e.preventDefault();
    console.log("Handling Step 1 submission");
    currentDPIA.steps.step1 = {
        projectAims: document.getElementById('projectAims').value,
        processingType: document.getElementById('processingType').value,
        dataSource: document.getElementById('dataSource').value,
        dpiaJustification: document.getElementById('dpiaJustification').value
    };
    showDPIAStep2();
}

function showDPIAStep2() {
    console.log("Showing DPIA Step 2");
    document.getElementById('dpiaStep1').style.display = 'none';
    const step2Element = document.getElementById('dpiaStep2');
    step2Element.style.display = 'block';
    step2Element.innerHTML = `
        <h2>Step 2: Describe the processing</h2>
        <form id="dpiaStep2Form">
            <div class="form-section">
                <h3>1. Nature of the processing</h3>
                <p class="explanation">How will you collect, use, store and delete data? What is the source of the data? Will you be sharing data with anyone?</p>
                <textarea id="processingNature" required>${currentDPIA.steps.step2?.processingNature || ''}</textarea>
            </div>
            <div class="form-section">
                <h3>2. Scope of the processing</h3>
                <p class="explanation">What is the nature of the data, and does it include special category or criminal offence data? How much data will you be collecting and using? How often? How long will you keep it? How many individuals are affected? What geographical area does it cover?</p>
                <textarea id="processingScope" required>${currentDPIA.steps.step2?.processingScope || ''}</textarea>
            </div>
            <div class="form-section">
                <h3>3. Context of the processing</h3>
                <p class="explanation">What is the nature of your relationship with the individuals? How much control will they have? Would they expect you to use their data in this way? Do they include children or other vulnerable groups? Are there prior concerns over this type of processing or security flaws? Is it novel in any way? What is the current state of technology in this area?</p>
                <textarea id="processingContext" required>${currentDPIA.steps.step2?.processingContext || ''}</textarea>
            </div>
            <div class="form-section">
                <h3>4. Purposes of the processing</h3>
                <p class="explanation">What do you want to achieve? What is the intended effect on individuals? What are the benefits of the processing for you, and more broadly?</p>
                <textarea id="processingPurposes" required>${currentDPIA.steps.step2?.processingPurposes || ''}</textarea>
            </div>
            <button type="submit">Save and Return to DPIA List</button>
        </form>
    `;
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
    currentDPIA.status = 'in progress';
    document.getElementById('dpiaStep2').style.display = 'none';
    document.getElementById('dpiaList').style.display = 'block';
    updateDPIAList();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    document.getElementById('createNewDPIA').addEventListener('click', createNewDPIA);
    updateDPIAList();
});
