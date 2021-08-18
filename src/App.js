  
import React, { useState } from 'react'
import './App.css';
import Dropdown from './Dropdown';

function App() {
  
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedSingleOption, setSelectedSingleOption] = useState('');

  const createOptions = () => {
    let options = [];
    for (let i = 0; i < 10; i++){
      options.push({label: `Option ${i}`, id: i});
    }
    return options;
  }
  
  return (
    <div className="App">
      <header className="App-header">
        {/* Set multiSelect to false for single select */}
        <Dropdown
          value={selectedOptions}
          onChange={(option) => setSelectedOptions(option)}
          options={createOptions()}
          multiSelect={true}
          selected={selectedSingleOption}
          setSelectedSingleOption={setSelectedSingleOption}
        />
      </header>
    </div>
  );
}

export default App;
