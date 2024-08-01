import React, { useState } from 'react';

function DPIAStep1({ dpia, showDPIAStep2 }) {
  const [formData, setFormData] = useState({
    projectAims: '',
    processingType: '',
    dpiaJustification: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('DPIA Step 1 Data:', formData);
    showDPIAStep2();
  };

  return (
    <div>
      <h2>DPIA Step 1</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectAims">Project Aims:</label>
          <textarea
            id="projectAims"
            name="projectAims"
            value={formData.projectAims}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="processingType">Type of Processing:</label>
          <textarea
            id="processingType"
            name="processingType"
            value={formData.processingType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dpiaJustification">DPIA Justification:</label>
          <textarea
            id="dpiaJustification"
            name="dpiaJustification"
            value={formData.dpiaJustification}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Save and Continue</button>
      </form>
    </div>
  );
}

export default DPIAStep1;
