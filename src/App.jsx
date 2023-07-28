import React from "react";
import RoomAllocation from './components/RoomAllocation.jsx'
// import CustomInputNumber from './components/CustomInputNumber.jsx'
function App() {
  function showResult(payload){
    console.log('showResult', payload);
  }
  return (
    <div className="App">
      <RoomAllocation 
        guest={10}
        room={3}
        onChange={showResult}
      />
    </div>
  );
}
export default App;