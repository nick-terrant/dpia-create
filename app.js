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
        const newDPIA = { id: Date.now().toString(), status: 'draft', steps: {} };
        console.log("New DPIA object created:", newDPIA);
        
        const docRef = await db.collection("dpias").add(newDPIA);
        newDPIA.id = docRef.id;
        
        dpias.push(newDPIA);
        console.log("DPIA added to local array");
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
    // ... (implement the rest of this function)
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
