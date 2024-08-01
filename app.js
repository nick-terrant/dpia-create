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
try {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// Initialize Firestore
let db;
try {
  db = firebase.firestore();
  console.log("Firestore initialized successfully");
} catch (error) {
  console.error("Error initializing Firestore:", error);
}



let dpias = [];
let currentDPIA = null;

async function createNewDPIA() {
    console.log("Creating new DPIA");
    logToPage("Creating new DPIA");
    try {
        const newDPIA = { id: Date.now(), status: 'draft', steps: {} };
        const docRef = await db.collection("dpias").add(newDPIA);
        newDPIA.id = docRef.id;
        dpias.push(newDPIA);
        updateDPIAList();
        showDPIAStep1(newDPIA);
    } catch (error) {
        console.error("Error in createNewDPIA:", error);
        logToPage("Error in createNewDPIA: " + error.message);
    }
}

async function updateDPIAList() {
    console.log("Updating DPIA list");
    try {
        const listElement = document.getElementById('dpiaListItems');
        if (!listElement) {
            throw new Error("dpiaListItems element not found");
        }
        listElement.innerHTML = '';
        
        const snapshot = await db.collection("dpias").get();
        dpias = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        
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

// Modify handleStep1Submit, handleStep2Submit, handleStep3Submit, and handleStep4Submit
// to update the Firestore document after each step submission

async function handleStep1Submit(e) {
    e.preventDefault();
    console.log("Handling Step 1 submission");
    try {
        currentDPIA.steps.step1 = {
            projectAims: document.getElementById('projectAims').value,
            processingType: document.getElementById('processingType').value,
            dataSource: document.getElementById('dataSource').value,
            dpiaJustification: document.getElementById('dpiaJustification').value
        };
        await db.collection("dpias").doc(currentDPIA.id).update({
            "steps.step1": currentDPIA.steps.step1
        });
        showDPIAStep2();
    } catch (error) {
        console.error("Error in handleStep1Submit:", error);
        logToPage("Error in handleStep1Submit: " + error.message);
    }
}

// Similarly, update handleStep2Submit, handleStep3Submit, and handleStep4Submit

async function handleStep4Submit(e) {
    e.preventDefault();
    console.log("Handling Step 4 submission");
    try {
        currentDPIA.steps.step4 = {
            necessityProportionality: document.getElementById('necessityProportionality').value
        };
        currentDPIA.status = 'completed';
        await db.collection("dpias").doc(currentDPIA.id).update({
            "steps.step4": currentDPIA.steps.step4,
            status: 'completed'
        });
        document.getElementById('dpiaStep4').style.display = 'none';
        document.getElementById('dpiaList').style.display = 'block';
        updateDPIAList();
    } catch (error) {
        console.error("Error in handleStep4Submit:", error);
        logToPage("Error in handleStep4Submit: " + error.message);
    }
}



// Modify initApp to load DPIAs from Firestore when the app starts
function initApp() {
  console.log("initApp function called");
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
        await updateDPIAList(); // This now loads DPIAs from Firestore
    } catch (error) {
        console.error("Error in initialization:", error);
        logToPage("Error in initialization: " + error.message);
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

// The rest of your code remains the same
