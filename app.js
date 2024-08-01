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
        dpias = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        
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
        currentDPIA.steps = currentDPIA.steps || {};
        currentDPIA.steps.step1 = {
            projectAims: document.getElementById('projectAims').value,
            processingType: document.getElementById('processingType').value,
            dataSource: document.getElementById('dataSource').value,
            dpiaJustification: document.getElementById('dpiaJustification').value
        };
        
        // Update Firestore
        await db.collection("dpias").doc(currentDPIA.id).update({
            "steps.step1": currentDPIA.steps.step1
        });
        
        console.log("Step 1 data saved successfully");
        // Here you would typically move to Step 2
        // For now, let's just go back to the DPIA list
        document.getElementById('dpiaStep1').style.display = 'none';
        document.getElementById('dpiaList').style.display = 'block';
        updateDPIAList();
    } catch (error) {
        console.error("Error in handleStep1Submit:", error);
        logToPage("Error in handleStep1Submit: " + error.message);
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
if (document.readyState === 'loading') {
    console.log("Document still loading, adding event listener");
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    console.log("Document already loaded, calling initApp directly");
    initApp();
}
