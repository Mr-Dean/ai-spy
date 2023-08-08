import { useState } from "react";
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
    <>
      <Header />
      {
        !data || data === 'error' ?
        <>
        <ImageLinkForm handleInput={handleInput} getData={getData} />
        <p>So far, I've spied 1,563,450 times.</p>
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