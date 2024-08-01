console.log("app.js loaded");

// Declare dpias at the top level
let dpias = [];
let currentDPIA = null;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1PHa_c_DzrbK_Zjt2hO4lwSdhNgZMFTo",
  authDomain: "smart-dpia.firebaseapp.com",
  projectId: "smart-dpia",
  storageBucket: "smart-dpia.appspot.com",
  messagingSenderId: "755471262348",
  appId: "1:755471262348:web:104795a08707a02f95d1a9",
  measurementId: "G-0SCK0RT47C"
};

// Initialize Firebase
let db;
try {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
  db = firebase.firestore();
  console.log("Firestore initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

async function createNewDPIA() {
    console.log("createNewDPIA function called");
    logToPage("Creating new DPIA");
    try {
        const newDPIA = { status: 'draft', steps: {} };
        console.log("New DPIA object created:", newDPIA);
        
        const docRef = await db.collection("dpias").add(newDPIA);
        newDPIA.id = docRef.id;
        
        // Update the Firestore document with the id field
        await db.collection("dpias").doc(docRef.id).update({ id: docRef.id });
        
        dpias.push(newDPIA);
        console.log("DPIA added to local array and Firestore with ID:", newDPIA.id);
        await updateDPIAList();
        showDPIAStep1(newDPIA);
    } catch (error) {
        console.error("Error in createNewDPIA:", error);
        logToPage("Error in createNewDPIA: " + error.message);
    }
}

async function updateDPIAList() {
    console.log("updateDPIAList function called");
    try {
        const listElement = document.getElementById('dpiaListItems');
        if (!listElement) {
            throw new Error("dpiaListItems element not found");
        }
        listElement.innerHTML = '';
        
        // Fetch DPIAs from Firestore
        const snapshot = await db.collection("dpias").get();
        dpias = snapshot.docs.map(doc => {
            const data = doc.data();
            if (!data.id) {
                console.warn("DPIA missing ID, adding it", doc.id);
                db.collection("dpias").doc(doc.id).update({ id: doc.id });
            }
            return { id: doc.id, ...data };
        });
        
        console.log("Number of DPIAs:", dpias.length);
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
    if (!dpia.id) {
        console.error("DPIA is missing an ID", dpia);
        logToPage("Error: DPIA is missing an ID");
        return;
    }
    currentDPIA = dpia;
    
    // Hide the DPIA list and show the Step 1 form
    document.getElementById('dpiaList').style.display = 'none';
    const step1Element = document.getElementById('dpiaStep1');
    step1Element.style.display = 'block';
    
    // Populate the form with existing data if available
    step1Element.innerHTML = `
        <h2>Step 1: Identify the need for a DPIA</h2>
        <form id="dpiaStep1Form">
            <div class="form-section">
                <h3>1. What does the project aim to achieve?</h3>
                <textarea id="projectAims" required>${dpia.steps?.step1?.projectAims || ''}</textarea>
            </div>
            <div class="form-section">
                <h3>2. What type of processing does it involve?</h3>
                <textarea id="processingType" required>${dpia.steps?.step1?.processingType || ''}</textarea>
            </div>
            <div class="form-section">
                <h3>3. What is the source of the data?</h3>
                <input type="text" id="dataSource" required value="${dpia.steps?.step1?.dataSource || ''}">
            </div>
            <div class="form-section">
                <h3>4. Why did you identify the need for a DPIA?</h3>
                <textarea id="dpiaJustification" required>${dpia.steps?.step1?.dpiaJustification || ''}</textarea>
            </div>
            <button type="submit">Continue to Step 2</button>
        </form>
    `;
    
    document.getElementById('dpiaStep1Form').onsubmit = handleStep1Submit;
}

async function handleStep1Submit(e) {
    e.preventDefault();
    console.log("Handling Step 1 submission");
    try {
        if (!currentDPIA || !currentDPIA.id) {
            throw new Error("No current DPIA or DPIA ID is missing");
        }

        console.log("Current DPIA:", currentDPIA);

        currentDPIA.steps = currentDPIA.steps || {};
        currentDPIA.steps.step1 = {
            projectAims: document.getElementById('projectAims').value,
            processingType: document.getElementById('processingType').value,
            dataSource: document.getElementById('dataSource').value,
            dpiaJustification: document.getElementById('dpiaJustification').value
        };
        
        console.log("Updating DPIA with ID:", currentDPIA.id);
        
        // Update Firestore
        await db.collection("dpias").doc(currentDPIA.id).update({
            "steps.step1": currentDPIA.steps.step1
        });
        
        console.log("Step 1 data saved successfully");
        showDPIAStep2();
    } catch (error) {
        console.error("Error in handleStep1Submit:", error);
        logToPage("Error in handleStep1Submit: " + error.message);
        alert("An error occurred while saving Step 1. Please try again.");
    }
}

function showDPIAStep2() {
    console.log("Showing DPIA Step 2");
    const step2Element = document.getElementById('dpiaStep2');
    document.getElementById('dpiaStep1').style.display = 'none';
    step2Element.style.display = 'block';
    
    step2Element.innerHTML = `
        <h2>Step 2: Describe the processing</h2>
        <form id="dpiaStep2Form">
            <div class="form-section">
                <h3>1. Nature of the processing</h3>
                <textarea id="processingNature" required>${currentDPIA.steps?.step2?.processingNature || ''}</textarea>
            </div>
            <div class="form-section">
                <h3>2. Scope of the processing</h3>
                <textarea id="processingScope" required>${currentDPIA.steps?.step2?.processingScope || ''}</textarea>
            </div>
            <div class="form-section">
                <h3>3. Context of the processing</h3>
                <textarea id="processingContext" required>${currentDPIA.steps?.step2?.processingContext || ''}</textarea>
            </div>
            <div class="form-section">
                <h3>4. Purposes of the processing</h3>
                <textarea id="processingPurposes" required>${currentDPIA.steps?.step2?.processingPurposes || ''}</textarea>
            </div>
            <button type="submit">Continue to Step 3</button>
        </form>
    `;
    
    document.getElementById('dpiaStep2Form').onsubmit = handleStep2Submit;
}

async function handleStep2Submit(e) {
    e.preventDefault();
    console.log("Handling Step 2 submission");
    try {
        if (!currentDPIA || !currentDPIA.id) {
            throw new Error("No current DPIA or DPIA ID is missing");
        }

        currentDPIA.steps.step2 = {
            processingNature: document.getElementById('processingNature').value,
            processingScope: document.getElementById('processingScope').value,
            processingContext: document.getElementById('processingContext').value,
            processingPurposes: document.getElementById('processingPurposes').value
        };
        
        await db.collection("dpias").doc(currentDPIA.id).update({
            "steps.step2": currentDPIA.steps.step2
        });
        
        console.log("Step 2 data saved successfully");
        showDPIAStep3();
    } catch (error) {
        console.error("Error in handleStep2Submit:", error);
        logToPage("Error in handleStep2Submit: " + error.message);
        alert("An error occurred while saving Step 2. Please try again.");
    }
}

function showDPIAStep3() {
    console.log("Showing DPIA Step 3");
    const step3Element = document.getElementById('dpiaStep3');
    document.getElementById('dpiaStep2').style.display = 'none';
    step3Element.style.display = 'block';
    
    step3Element.innerHTML = `
        <h2>Step 3: Consultation process</h2>
        <form id="dpiaStep3Form">
            <div class="form-section">
                <h3>Describe the consultation process</h3>
                <textarea id="consultationProcess" required>${currentDPIA.steps?.step3?.consultationProcess || ''}</textarea>
            </div>
            <button type="submit">Continue to Step 4</button>
        </form>
    `;
    
    document.getElementById('dpiaStep3Form').onsubmit = handleStep3Submit;
}

async function handleStep3Submit(e) {
    e.preventDefault();
    console.log("Handling Step 3 submission");
    try {
        if (!currentDPIA || !currentDPIA.id) {
            throw new Error("No current DPIA or DPIA ID is missing");
        }

        currentDPIA.steps.step3 = {
            consultationProcess: document.getElementById('consultationProcess').value
        };
        
        await db.collection("dpias").doc(currentDPIA.id).update({
            "steps.step3": currentDPIA.steps.step3
        });
        
        console.log("Step 3 data saved successfully");
        showDPIAStep4();
    } catch (error) {
        console.error("Error in handleStep3Submit:", error);
        logToPage("Error in handleStep3Submit: " + error.message);
        alert("An error occurred while saving Step 3. Please try again.");
    }
}

function showDPIAStep4() {
    console.log("Showing DPIA Step 4");
    const step4Element = document.getElementById('dpiaStep4');
    document.getElementById('dpiaStep3').style.display = 'none';
    step4Element.style.display = 'block';
    
    step4Element.innerHTML = `
        <h2>Step 4: Assess necessity and proportionality</h2>
        <form id="dpiaStep4Form">
            <div class="form-section">
                <h3>Describe compliance and proportionality measures</h3>
                <textarea id="necessityProportionality" required>${currentDPIA.steps?.step4?.necessityProportionality || ''}</textarea>
            </div>
            <button type="submit">Complete DPIA</button>
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
        document.getElementById('dpiaStep4').style.display = 'none';
        document.getElementById('dpiaList').style.display = 'block';
        await updateDPIAList();
    } catch (error) {
        console.error("Error in handleStep4Submit:", error);
        logToPage("Error in handleStep4Submit: " + error.message);
        alert("An error occurred while completing the DPIA. Please try again.");
    }
}

function initApp() {
    console.log("initApp function called");
    try {
        const createButton = document.getElementById('createNewDPIA');
        if (!createButton) {
            throw new Error("createNewDPIA button not found");
        }
        console.log("Adding click event listener to createNewDPIA button");
        createButton.addEventListener('click', function(event) {
            console.log("Create DPIA button clicked");
            createNewDPIA();
        });
        console.log("Click event listener added successfully");
        updateDPIAList();
    } catch (error) {
        console.error("Error in initialization:", error);
        logToPage("Error in initialization: " + error.message);
    }
}


console.log("End of app.js file reached");
function logToPage(message) {
    console.log(message);
    const errorDisplay = document.getElementById('errorDisplay');
    if (errorDisplay) {
        errorDisplay.style.display = 'block';
        errorDisplay.innerHTML += message + '<br>';
    } else {
        console.error("Error display element not found");
    }
}


// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event fired");
    initApp();
});
