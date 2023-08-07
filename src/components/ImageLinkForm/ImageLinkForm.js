import { useState } from "react";
import clarifaiAPI from "../../api/clarifai";

const ImageLinkForm = () => {
    const [input, setInput] = useState("");

    const handleInput = (e) => {
        console.log(e.target.value)
        setInput(e.target.value);
    }

    const handleSubmit = (input) => {
        console.log("input")
        clarifaiAPI();
        
    }

    return (
       <div>
        <p>Give me an image and I will tell you what's in it.</p>
        <div>
            <input type='text' placeholder="Paste a link to an image here..." onChange={handleInput}/> 
            <button onClick={handleSubmit}>Submit</button>
        </div>
       </div>
    )
}

export default ImageLinkForm;