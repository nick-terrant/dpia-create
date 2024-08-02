console.log("app.js loaded");

// Declare dpias at the top level
let dpias = [];
let currentDPIA = null;

// Firebase configuration
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

if (!db) {
  console.error("Firestore not initialized");
  alert("Database not initialized. Please refresh the page and try again.");
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
    openDPIAForm(newDPIA);
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
    dpias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    console.log("Number of DPIAs:", dpias.length);
    dpias.forEach(dpia => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `checkbox-${dpia.id}`;
      
      const button = document.createElement('button');
      button.textContent = `DPIA ${dpia.id} - ${dpia.status}`;
      button.onclick = () => openDPIAForm(dpia);
      
      li.appendChild(checkbox);
      li.appendChild(button);
      listElement.appendChild(li);
    });
  } catch (error) {
    console.error("Error in updateDPIAList:", error);
    logToPage("Error in updateDPIAList: " + error.message);
  }
}

async function deleteSelectedDPIAs() {
  const selectedCheckboxes = document.querySelectorAll('#dpiaListItems input[type="checkbox"]:checked');
  const selectedIds = Array.from(selectedCheckboxes).map(checkbox => checkbox.id.replace('checkbox-', ''));
  
  if (selectedIds.length === 0) {
    alert("Please select at least one DPIA to delete.");
    return;
  }

  const confirmDelete = confirm(`Are you sure you want to delete ${selectedIds.length} selected DPIA(s)?`);
  if (!confirmDelete) return;
  
  try {
    for (const id of selectedIds) {
      await db.collection("dpias").doc(id).delete();
    }
    await updateDPIAList();
    alert("Selected DPIAs have been deleted successfully.");
  } catch (error) {
    console.error("Error deleting DPIAs:", error);
    alert("An error occurred while deleting DPIAs. Please try again.");
  }
}

function openDPIAForm(dpia) {
  currentDPIA = dpia;
  const url = `dpia-form.html?dpiaId=${dpia.id}`;
  window.open(url, '_blank');
}

// ... (Rest of the code remains the same) ...
