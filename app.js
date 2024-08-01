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
                <!-- ... (form content) ... -->
                <button type="submit">Continue to Step 2</button>
            </form>
        `;
        document.getElementById('dpiaStep1Form').onsubmit = handleStep1Submit;
    } catch (error) {
        console.error("Error in showDPIAStep1:", error);
        logToPage("Error in showDPIAStep1: " + error.message);
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

// ... (other functions) ...

// Initialize the app
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
