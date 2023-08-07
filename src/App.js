import './App.css';
import Header from './components/Header/Header';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'
import { useState } from 'react';
import clarifaiAPI from './api/clarifai';



function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState();

  let found = []

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const getData = async () => {
    const data = await clarifaiAPI(input);
    setData(data);
  }

  if (data) {
    for (let i = 0; i < data.length; i++) {
      found.push(data[i].data.concepts[0].name);
    }
    console.log(found)
  } else {
    console.log('no data')
  }
 

  return (
    <div className="App">
      <Header />
      <ImageLinkForm handleInput={handleInput} getData={getData} />
      <ParticlesBg type="cobweb" color="#DADADA" num={100} bg={true} />
      {/*
      <ImageRecog /> */}
    </div>
  );
}

export default App;
