import React, { useState } from "react";
import DPIAList from "./DPIAList";
import DPIAStep1 from "./DPIAStep1";
import DPIAStep2 from "./DPIAStep2";
import DPIAStep3 from "./DPIAStep3";

export default function App() {
  const [currentView, setCurrentView] = useState("list");
  const [currentDPIA, setCurrentDPIA] = useState(null);

  const showDPIAList = () => setCurrentView("list");
  const showDPIAStep1 = (dpia) => {
    setCurrentDPIA(dpia);
    setCurrentView("step1");
  };
  const showDPIAStep2 = () => setCurrentView("step2");
  const showDPIAStep3 = () => setCurrentView("step3");

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
        <DPIAStep2 dpia={currentDPIA} showDPIAStep3={showDPIAStep3} />
      )}
      {currentView === "step3" && (
        <DPIAStep3 dpia={currentDPIA} showDPIAList={showDPIAList} />
      )}
    </div>
  );
}
