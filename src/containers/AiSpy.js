import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Button from "../components/Button/Button";
import FoundCard from "../components/FoundCard/FouncCard";
import DisplayImage from "../components/DisplayImage/DisplayImage";

import clarifaiAPI from "../api/clarifai";


const AiSpy = ({handleReset}) => {
  const [input, setInput] = useState("");
  const [data, setData] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [count, setCount] = useState();

  useEffect(() => {
    fetch('http://localhost:3000/')
    .then(res => res.json())
    .then(res => setCount(res.count))
    .catch(err => console.log(err))
  }, []);

  let found = []

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const getData = async () => {
    const data = await clarifaiAPI(input);
    setImageUrl(input);
    setData(data);
    setInput("");
    
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    }

    fetch('http://localhost:3000/count', requestOptions)
      .then(response => response.json())
      .catch(err => console.log(err));
  }


  if (data && data !== 'error') {
    for (let i = 0; i < data.length; i++) {
      found.push(data[i].data.concepts[0].name);
    }
  } else {
    console.log('no data')
  }
 

  return (
    <>
      <Header />
      {
        !data || data === 'error' ?
        <>
        <ImageLinkForm handleInput={handleInput} getData={getData} />
        <p>So far, I've spied {count} things.</p>
        </>
        :
        data === 'error' ?
        <p>Oops something went wrong...try again</p>
        :
        <>
          <FoundCard found={found}/>
          <DisplayImage imageUrl={imageUrl} />
          <Button handleCLick={handleReset} text="Try again"/>
        </>
      }
    </>
  );
}

export default AiSpy;