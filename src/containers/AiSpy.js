import { useEffect, useState } from "react";
import axios from 'axios';

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
    axios.get('http://localhost:3000/')
      .then(response => {
        setCount(response.data.count);
      })
      .catch(error => {
        console.log(error);
      });
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
    
    setCount(count => {
      const updatedCount = count + 1;
      updateCount(updatedCount);
      return updatedCount; 
    });
  }

  const updateCount = async (newCount) => {
    try {
      const response = await axios.put('http://localhost:3000/api/updateCount', { count: newCount });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  


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