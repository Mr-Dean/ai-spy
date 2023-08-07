import './App.css';
import Header from './components/Header/Header';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'
import { useState } from 'react';
import clarifaiAPI from './api/clarifai';
import DisplayImage from './components/DisplayImage/DisplayImage';
import FoundCard from './components/FoundCard/FouncCard';
import Button from './components/Button/Button';



function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState();
  const [imageUrl, setImageUrl] = useState();

  let found = []

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const getData = async () => {
    const data = await clarifaiAPI(input);
    setImageUrl(input);
    setData(data);
    setInput("");
  }


  if (data && data !== 'error') {
    for (let i = 0; i < data.length; i++) {
      found.push(data[i].data.concepts[0].name);
    }

  } else {
    console.log('no data')
  }
 

  return (
    <div className="App">
      
      <Header />
      {
        !data || data === 'error' ?
        <ImageLinkForm handleInput={handleInput} getData={getData} />
        :
        data === 'error' ?
        <p>Oops something went wrong...try again</p>
        :
        <>
          <FoundCard found={found}/>
          <DisplayImage imageUrl={imageUrl} />
          <Button text="Try again"/>
        </>
      }
      <ParticlesBg type="cobweb" color="#DADADA" num={100} bg={true} />
      {/*
      <ImageRecog /> */}
    </div>
  );
}

export default App;
