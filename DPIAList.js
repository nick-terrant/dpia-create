import React, { useState } from 'react';

function DPIAList({ showDPIAStep1 }) {
  const [dpias, setDpias] = useState([]);

  const createNewDPIA = () => {
    const newDPIA = { id: Date.now(), status: 'draft' };
    setDpias([...dpias, newDPIA]);
  };

  return (
    <div>
      <h2>DPIA List</h2>
      <button onClick={createNewDPIA}>Create New DPIA</button>
      <ul>
        {dpias.map((dpia) => (
          <li key={dpia.id}>
            <button onClick={() => showDPIAStep1(dpia)}>
              DPIA {dpia.id} - {dpia.status}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DPIAList;
