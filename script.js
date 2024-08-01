import React, { useState } from "react";
import DPIAList from "./DPIAList";
import DPIAStep1 from "./DPIAStep1";
import DPIAStep2 from "./DPIAStep2";

export default function App() {
  const [currentView, setCurrentView] = useState("list");
  const [currentDPIA, setCurrentDPIA] = useState(null);

  const showDPIAList = () => setCurrentView("list");
  const showDPIAStep1 = (dpia) => {
    setCurrentDPIA(dpia);
    setCurrentView("step1");
  };
  const showDPIAStep2 = () => setCurrentView("step2");

  return (
    <div className="App">
      <h1>DPIA Prototype</h1>
      {currentView === "list" && (
        <DPIAList showDPIAStep1={showDPIAStep1} />
      )}
      {currentView === "step1" && (
        <DPIAStep1 dpia={currentDPIA} showDPIAStep2={showDPIAStep2} />
      )}
      {currentView === "step2" && (
        <DPIAStep2 dpia={currentDPIA} showDPIAList={showDPIAList} />
      )}
    </div>
  );
// Add this to your existing JavaScript

function showDPIAStep2() {
    document.getElementById('dpiaStep1').style.display = 'none';
    document.getElementById('dpiaStep2').style.display = 'block';
}

document.getElementById('dpiaStep2Form').onsubmit = function(e) {
    e.preventDefault();
    const formData = {
        dataTypes: Array.from(document.querySelectorAll('input[name="dataTypes"]:checked')).map(el => el.value),
        dataVolume: document.getElementById('dataVolume').value,
        risks: Array.from(document.querySelectorAll('input[name="risks"]:checked')).map(el => el.value),
        safeguards: document.getElementById('safeguards').value,
        dataSharing: document.querySelector('input[name="dataSharing"]:checked').value,
        dataSharingExplanation: document.getElementById('dataSharingExplanation').value
    };
    console.log('DPIA Step 2 Data:', formData);
    // Here you would typically save the data and move to the next step
    alert('Step 2 completed! Data logged to console.');
    showDPIAList(); // For now, we'll just go back to the list
};

// Show/hide data sharing explanation based on selection
document.querySelectorAll('input[name="dataSharing"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('dataSharingDetails').style.display = 
            this.value === 'yes' ? 'block' : 'none';
    });
});

// Add this to your existing JavaScript

function showDPIAStep3() {
    document.getElementById('dpiaStep2').style.display = 'none';
    document.getElementById('dpiaStep3').style.display = 'block';
}

document.getElementById('dpiaStep3Form').onsubmit = function(e) {
    e.preventDefault();
    const formData = {
        dataMinimization: document.getElementById('dataMinimization').value,
        retentionPeriod: document.getElementById('retentionPeriod').value,
        retentionJustification: document.getElementById('retentionJustification').value,
        informMethods: Array.from(document.querySelectorAll('input[name="informMethods"]:checked')).map(el => el.value),
        otherInformMethod: document.getElementById('otherInformMethodText').value,
        subjectRights: Array.from(document.getElementsByName('subjectRights')).map(el => el.value),
        dataTransfer: document.querySelector('input[name="dataTransfer"]:checked').value,
        dataTransferExplanation: document.getElementById('dataTransferExplanation').value
    };
    console.log('DPIA Step 3 Data:', formData);
    // Here you would typically save the data and move to a review step
    alert('Step 3 completed! Data logged to console. Ready for review.');
    showDPIAList(); // For now, we'll just go back to the list
};

// Show/hide other inform method input based on checkbox
document.querySelector('input[name="informMethods"][value="other"]').addEventListener('change', function() {
    document.getElementById('otherInformMethod').style.display = 
        this.checked ? 'block' : 'none';
});

// Show/hide data transfer explanation based on selection
document.querySelectorAll('input[name="dataTransfer"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('dataTransferDetails').style.display = 
            this.value === 'yes' ? 'block' : 'none';
    });
});

// Modify the Step 2 submit handler to proceed to Step 3
document.getElementById('dpiaStep2Form').onsubmit = function(e) {
    e.preventDefault();
    const formData = {
        dataTypes: Array.from(document.querySelectorAll('input[name="dataTypes"]:checked')).map(el => el.value),
        dataVolume: document.getElementById('dataVolume').value,
        risks: Array.from(document.querySelectorAll('input[name="risks"]:checked')).map(el => el.value),
        safeguards: document.getElementById('safeguards').value,
        dataSharing: document.querySelector('input[name="dataSharing"]:checked').value,
        dataSharingExplanation: document.getElementById('dataSharingExplanation').value
    };
    console.log('DPIA Step 2 Data:', formData);
    showDPIAStep3(); // Proceed to Step 3
};
}
