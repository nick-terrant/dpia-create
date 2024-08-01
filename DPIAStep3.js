import React, { useState } from 'react';

function DPIAStep3({ dpia, showDPIAList }) {
  const [formData, setFormData] = useState({
    dataMinimization: '',
    retentionPeriod: '',
    retentionJustification: '',
    informMethods: [],
    otherInformMethod: '',
    subjectRights: ['', '', '', ''],
    dataTransfer: '',
    dataTransferExplanation: ''
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
    console.log('DPIA Step 3 Data:', formData);
    showDPIAList();
  };

  return (
    <div id="dpiaStep3">
      <h2>Step 3: Ensuring Compliance and Data Subject Rights</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields go here, using the structure from your HTML but with React syntax */}
        {/* Example: */}
        <div className="form-section">
          <h3>1. How will you ensure data minimization?</h3>
          <p className="explanation">Describe how you'll collect and retain only the data necessary for your purposes:</p>
          <textarea
            name="dataMinimization"
            value={formData.dataMinimization}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Add other form sections here */}
        <button type="submit">Review DPIA</button>
      </form>
    </div>
  );
}

export default DPIAStep3;
