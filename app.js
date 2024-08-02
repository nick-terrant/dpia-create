// Firebase configuration
const firebaseConfig = {
  // ... (your Firebase config here)
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
  logToPage("Error initializing Firebase. Please refresh the page and try again.");
}

// Global variables
let dpias = [];
let currentDPIA = null;

// Helper functions
function logToPage(message) {
  console.log(message);
  const errorDisplay = document.getElementById('errorDisplay');
  if (errorDisplay) {
    errorDisplay.classList.remove('hidden');
    errorDisplay.innerHTML += message + '<br>';
  } else {
    console.error("Error display element not found");
  }
}

async function fetchCollectionData(collectionName, fieldName) {
  const snapshot = await db.collection(collectionName).get();
  if (snapshot.empty) {
    console.log(`No documents found in ${collectionName}`);
    return [];
  }
  return snapshot.docs[0].data()[fieldName] || [];
}

// DPIA List Management
async function updateDPIAList() {
  try {
    const listElement = document.getElementById('dpiaListItems');
    if (!listElement) {
      throw new Error("dpiaListItems element not found");
    }
    listElement.innerHTML = '';
    
    const snapshot = await db.collection("dpias").get();
    dpias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
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

// ... (rest of the functions: createNewDPIA, deleteSelectedDPIAs, showDPIAStep1, etc.)

// App initialization
function initApp() {
  console.log("Initializing app");
  try {
    const createButton = document.getElementById('createNewDPIA');
    const deleteButton = document.getElementById('deleteSelectedDPIAs');
    
    if (!createButton || !deleteButton) {
      throw new Error("Required buttons not found");
    }
    
    createButton.addEventListener('click', createNewDPIA);
    deleteButton.addEventListener('click', deleteSelectedDPIAs);
    
    updateDPIAList();
  } catch (error) {
    console.error("Error in initialization:", error);
    logToPage("Error in initialization: " + error.message);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
