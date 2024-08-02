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

function showEditView() {
    document.getElementById('mainView').classList.add('hidden');
    document.getElementById('dpiaEditView').classList.remove('hidden');
}

function showMainView() {
    document.getElementById('dpiaEditView').classList.add('hidden');
    document.getElementById('mainView').classList.remove('hidden');
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
    showEditView();
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
      button.onclick = () => showDPIAStep1(dpia);
      
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

function showDPIAStep1(dpia) {
  fetchFirestoreData();
  currentDPIA = dpia;
  
  const step1Element = document.getElementById('dpiaStep1');
  step1Element.innerHTML = `
    <h2>Edit DPIA: ${dpia.id}</h2>
    <form id="dpiaStep1Form">
      <div class="form-section">
        <h3>1. What does the project aim to achieve?</h3>
        <p class="explanation">Explain broadly what the project aims to achieve and what type of processing it involves.</p>
        <textarea id="projectAims" required>${dpia.steps?.step1?.projectAims || ''}</textarea>
      </div>
      <div class="form-section">
        <h3>2. What type of processing does it involve?</h3>
        <p class="explanation">Describe the nature of the processing. How will you collect, use, store and delete data?</p>
        <textarea id="processingType" required>${dpia.steps?.step1?.processingType || ''}</textarea>
      </div>
      <div class="form-section">
        <h3>3. What is the source of the data?</h3>
        <p class="explanation">Specify the source of the data you'll be processing.</p>
        <input type="text" id="dataSource" required value="${dpia.steps?.step1?.dataSource || ''}">
      </div>
      <div class="form-section">
        <h3>4. Why did you identify the need for a DPIA?</h3>
        <p class="explanation">Summarise why you identified the need for a DPIA.</p>
        <textarea id="dpiaJustification" required>${dpia.steps?.
