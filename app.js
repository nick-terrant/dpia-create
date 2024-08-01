let dpias = [];
let currentDPIA = null;

function createNewDPIA() {
    console.log("Creating new DPIA");
    logToPage("Creating new DPIA");
    try {
        const newDPIA = { id: Date.now(), status: 'draft', steps: {} };
        dpias.push(newDPIA);
        updateDPIAList();
        showDPIAStep1(newDPIA);
    } catch (error) {
        console.error("Error in createNewDPIA:", error);
        logToPage("Error in createNewDPIA: " + error.message);
    }
}

function logToPage(message) {
    const errorDisplay = document.getElementById('errorDisplay');
    if (errorDisplay) {
        errorDisplay.style.display = 'block';
        errorDisplay.innerHTML += message + '<br>';
    }
}


function updateDPIAList() {
    console.log("Updating DPIA list");
    try {
        const listElement = document.getElementById('dpiaListItems');
        if (!listElement) {
            console.error("dpiaListItems element not found");
            return;
        }
        listElement.innerHTML = '';
        dpias.forEach(dpia => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = `DPIA ${dpia.id} - ${dpia.status}`;
            button.onclick = () => showDPIAStep1(dpia);
            li.appendChild(button);
            listElement.appendChild(li);
        });
    } catch (error) {
        console.error("Error in updateDPIAList:", error);
    }
}

function showDPIAStep1(dpia) {
    console.log("Showing DPIA Step 1", dpia);
    try {
        currentDPIA = dpia;
        document.getElementById('dpiaList').style.display = 'none';
        const step1Element = document.getElementById('dpiaStep1');
        if (!step1Element) {
            console.error("dpiaStep1 element not found");
            return;
        }
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
    } catch (error) {
        console.error("Error in showDPIAStep1:", error);
    }
}

function handleStep1Submit(e) {
    e.preventDefault();
    console.log("Handling Step 1 submission");
    try {
        currentDPIA.steps.step1 = {
            projectAims: document.getElementById('projectAims').value,
            processingType: document.getElementById('processingType').value,
            dataSource: document.getElementById('dataSource').value,
            dpiaJustification: document.getElementById('dpiaJustification').value
        };
        showDPIAStep2();
    } catch (error) {
        console.error("Error in handleStep1Submit:", error);
    }
}

// ... (Similar try-catch blocks for other functions)

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    try {
        const createButton = document.getElementById('createNewDPIA');
        if (!createButton) {
            console.error("createNewDPIA button not found");
            return;
        }
        createButton.addEventListener('click', createNewDPIA);
        updateDPIAList();
    } catch (error) {
        console.error("Error in initialization:", error);
    }
});
