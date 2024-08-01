import React, { useState } from 'react';

function DPIAStep2({ dpia, showDPIAStep3 }) {
  const [formData, setFormData] = useState({
    dataTypes: [],
    dataVolume: '',
    risks: [],
    safeguards: '',
    dataSharing: '',
    dataSharingExplanation: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('DPIA Step 2 Data:', formData);
    showDPIAStep3();
  };

  return (
    <div id="dpiaStep2">
      <h2>Step 2: Data Specifics and Risk Assessment</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields go here, using the structure from your HTML but with React syntax */}
        {/* Example: */}
        <div className="form-section">
          <h3>1. What types of personal data are you handling?</h3>
          <p className="explanation">Select all that apply:</p>
          <div className="checkbox-group">
            {['name', 'contact', 'financial', 'health', 'location', 'biometric', 'other'].map(type => (
              <label key={type}>
                <input
                  type="checkbox"
                  name="dataTypes"
                  value={type}
                  checked={formData.dataTypes.includes(type)}
                  onChange={handleInputChange}
                /> {type}
              </label>
            ))}
          </div>
        </div>
        {/* Add other form sections here */}
        <button type="submit">Continue to Next Step</button>
      </form>
    </div>
  );
}

export default DPIAStep2;
