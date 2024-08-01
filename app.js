// Your web app's Firebase configuration
const firebaseConfig = {
    // Your config object here
    // apiKey: "YOUR_API_KEY",
    // authDomain: "YOUR_AUTH_DOMAIN",
    // projectId: "YOUR_PROJECT_ID",
    // ...
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

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

function updateDPIAList() {
    console.log("Updating DPIA list");
    try {
        const listElement = document.getElementById('dpiaListItems');
        if (!listElement) {
            throw new Error("dpiaListItems element not found");
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
        logToPage("Error in updateDPIAList: " + error.message);
    }
}

function showDPIAStep1(dpia) {
    console.log("Showing DPIA Step 1", dpia);
    logToPage("Showing DPIA Step 1");
    try {
        currentDPIA = dpia;
        const dpiaListElement = document.getElementById('dpiaList');
        const step1Element = document.getElementById('dpiaStep1');
        
        if (!dpiaListElement) {
            throw new Error("dpiaList element not found");
        }
        if (!step1Element) {
            throw new Error("dpiaStep1 element not found");
        }
        
        dpiaListElement.style.display = 'none';
        step1Element.style.display = 'block';
        step1Element.innerHTML = `
            <h2>Step 1: Identify the need for a DPIA</h2>
            <form id="dpiaStep1Form">
                <div class="form-section">
                    <h3>1. What does the project aim to achieve?</h3>
                    <textarea id="projectAims" required>${dpia.steps.step1?.projectAims || ''}</textarea>
                </div>
                <div class="form-section">
                    <h3>2. What type of processing does it involve?</h3>
                    <textarea id="processingType" required>${dpia.steps.step1?.processingType || ''}</textarea>
                </div>
                <div class="form-section">
                    <h3>3. What is the source of the data?</h3>
                    <input type="text" id="dataSource" required value="${dpia.steps.step1?.dataSource || ''}">
                </div>
                <div class="form-section">
                    <h3>4. Why did you identify the need for a DPIA?</h3>
                    <textarea id="dpiaJustification" required>${dpia.steps.step1?.dpiaJustification || ''}</textarea>
                </div>
                <button type="submit">Continue to Step 2</button>
            </form>
        `;
        document.getElementById('dpiaStep1Form').onsubmit = handleStep1Submit;
    } catch (error) {
        console.error("Error in showDPIAStep1:", error);
        logToPage("Error in showDPIAStep1: " + error.message);
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
        logToPage("Error in handleStep1Submit: " + error.message);
    }
}

function showDPIAStep2() {
    console.log("Showing DPIA Step 2");
    logToPage("Showing DPIA Step 2");
    try {
        document.getElementById('dpiaStep1').style.display = 'none';
        const step2Element = document.getElementById('dpiaStep2');
        if (!step2Element) {
            throw new Error("dpiaStep2 element not found");
        }
        step2Element.style.display = 'block';
        step2Element.innerHTML = `
            <h2>Step 2: Describe the processing</h2>
            <form id="dpiaStep2Form">
                <div class="form-section">
                    <h3>1. Nature of the processing</h3>
                    <textarea id="processingNature" required>${currentDPIA.steps.step2?.processingNature || ''}</textarea>
                </div>
                <div class="form-section">
                    <h3>2. Scope of the processing</h3>
                    <textarea id="processingScope" required>${currentDPIA.steps.step2?.processingScope || ''}</textarea>
                </div>
                <div class="form-section">
                    <h3>3. Context of the processing</h3>
                    <textarea id="processingContext" required>${currentDPIA.steps.step2?.processingContext || ''}</textarea>
                </div>
                <div class="form-section">
                    <h3>4. Purposes of the processing</h3>
                    <textarea id="processingPurposes" required>${currentDPIA.steps.step2?.processingPurposes || ''}</textarea>
                </div>
                <button type="submit">Continue to Step 3</button>
            </form>
        `;
        document.getElementById('dpiaStep2Form').onsubmit = handleStep2Submit;
    } catch (error) {
        console.error("Error in showDPIAStep2:", error);
        logToPage("Error in showDPIAStep2: " + error.message);
    }
}

function handleStep2Submit(e) {
    e.preventDefault();
    console.log("Handling Step 2 submission");
    try {
        currentDPIA.steps.step2 = {
            processingNature: document.getElementById('processingNature').value,
            processingScope: document.getElementById('processingScope').value,
            processingContext: document.getElementById('processingContext').value,
            processingPurposes: document.getElementById('processingPurposes').value
        };
        showDPIAStep3();
    } catch (error) {
        console.error("Error in handleStep2Submit:", error);
        logToPage("Error in handleStep2Submit: " + error.message);
    }
}

function showDPIAStep3() {
    console.log("Showing DPIA Step 3");
    logToPage("Showing DPIA Step 3");
    try {
        document.getElementById('dpiaStep2').style.display = 'none';
        const step3Element = document.getElementById('dpiaStep3');
        if (!step3Element) {
            throw new Error("dpiaStep3 element not found");
        }
        step3Element.style.display = 'block';
        step3Element.innerHTML = `
            <h2>Step 3: Consultation process</h2>
            <form id="dpiaStep3Form">
                <div class="form-section">
                    <h3>Describe the consultation process</h3>
                    <textarea id="consultationProcess" required>${currentDPIA.steps.step3?.consultationProcess || ''}</textarea>
                </div>
                <button type="submit">Continue to Step 4</button>
            </form>
        `;
        document.getElementById('dpiaStep3Form').onsubmit = handleStep3Submit;
    } catch (error) {
        console.error("Error in showDPIAStep3:", error);
        logToPage("Error in showDPIAStep3: " + error.message);
    }
}

function handleStep3Submit(e) {
    e.preventDefault();
    console.log("Handling Step 3 submission");
    try {
        currentDPIA.steps.step3 = {
            consultationProcess: document.getElementById('consultationProcess').value
        };
        showDPIAStep4();
    } catch (error) {
        console.error("Error in handleStep3Submit:", error);
        logToPage("Error in handleStep3Submit: " + error.message);
    }
}

function showDPIAStep4() {
    console.log("Showing DPIA Step 4");
    logToPage("Showing DPIA Step 4");
    try {
        document.getElementById('dpiaStep3').style.display = 'none';
        const step4Element = document.getElementById('dpiaStep4');
        if (!step4Element) {
            throw new Error("dpiaStep4 element not found");
        }
        step4Element.style.display = 'block';
        step4Element.innerHTML = `
            <h2>Step 4: Assess necessity and proportionality</h2>
            <form id="dpiaStep4Form">
                <div class="form-section">
                    <h3>Describe compliance and proportionality measures</h3>
                    <textarea id="necessityProportionality" required>${currentDPIA.steps.step4?.necessityProportionality || ''}</textarea>
                </div>
                <button type="submit">Save and Return to DPIA List</button>
            </form>
        `;
        document.getElementById('dpiaStep4Form').onsubmit = handleStep4Submit;
    } catch (error) {
        console.error("Error in showDPIAStep4:", error);
        logToPage("Error in showDPIAStep4: " + error.message);
    }
}

function handleStep4Submit(e) {
    e.preventDefault();
    console.log("Handling Step 4 submission");
    try {
        currentDPIA.steps.step4 = {
            necessityProportionality: document.getElementById('necessityProportionality').value
        };
        currentDPIA.status = 'completed';
        document.getElementById('dpiaStep4').style.display = 'none';
        document.getElementById('dpiaList').style.display = 'block';
        updateDPIAList();
    } catch (error) {
        console.error("Error in handleStep4Submit:", error);
        logToPage("Error in handleStep4Submit: " + error.message);
    }
}

function logToPage(message) {
    const errorDisplay = document.getElementById('errorDisplay');
    if (errorDisplay) {
        errorDisplay.style.display = 'block';
        errorDisplay.innerHTML += message + '<br>';
    } else {
        console.error("Error display element not found");
    }
}

function initApp() {
    console.log("Initializing app");
    logToPage("Initializing app");
    try {
        const createButton = document.getElementById('createNewDPIA');
        if (!createButton) {
            throw new Error("createNewDPIA button not found");
        }
        console.log("Adding click event listener to createNewDPIA button");
        logToPage("Adding click event listener to createNewDPIA button");
        createButton.addEventListener('click', createNewDPIA);
        console.log("Click event listener added successfully");
        logToPage("Click event listener added successfully");
        updateDPIAList();
    } catch (error) {
        console.error("Error in initialization:", error);
        logToPage("Error in initialization: " + error.message);
    }
}

// Ensure the DOM is fully loaded before running the script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
