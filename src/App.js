import './App.css';

import AiSpy from './containers/AiSpy';
import ParticlesBg from 'particles-bg';

import { useState } from 'react';



function App() {
  const [version, setVersion] = useState(0);

  function handleReset() {
    setVersion(version + 1);
  }

  return (
    <div className="App">
      <AiSpy key={version} handleReset={handleReset}/>
      <ParticlesBg type="cobweb" color="#B0C8FF" num={100} bg={true} />
    </div>
    
  );
}

export default App;
