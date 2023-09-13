import { useEffect, useState } from "react";
import axios from 'axios';

import Header from "../components/Header/Header";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Button from "../components/Button/Button";
import FoundCard from "../components/FoundCard/FouncCard";
import DisplayImage from "../components/DisplayImage/DisplayImage";


const AiSpy = ({handleReset}) => {
  const [input, setInput] = useState("");
  const [data, setData] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [count, setCount] = useState();

  useEffect(() => {
    const getCount = async () => {
      await axios.get('https://ai-spy-server.onrender.com/')
      .then(response => {
        console.log(response)
        setCount(parseInt(response.data[0].count)); //count parsed to int.
      })
      .catch(error => {
        console.log('error with get req to /', error);
      });
    }
    getCount();
  }, []);

  let found = []

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  
  const getData = async () => {
    try {
      const data = await axios.post('https://ai-spy-server.onrender.com/imageUrl', { input: input });

      console.log(data.data)

      setImageUrl(input);
      setData(data.data);
      setInput("");

      setCount(count => {
        const updatedCount = count + 1;
        updateCount(updatedCount);
        return updatedCount; 
      });
    }
    catch (error) {
      console.log(error)
    }
  }

  const updateCount = async (newCount) => {
    try {
      const response = await axios.put(
        'https://ai-spy-server.onrender.com/updateCount',
        { count: newCount },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error updating count:', error);
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
        <p>Oops something went wrong...</p>
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