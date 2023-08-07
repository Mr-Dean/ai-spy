const ImageLinkForm = ({ handleInput, getData}) => {
    return (
       <div>
        <p>Give me an image and I will tell you what's in it.</p>
        <div>
            <input type='text' placeholder="Paste a link to an image here..." onChange={handleInput}/> 
            <button onClick={getData}>Submit</button>
        </div>
       </div>
    )
}

export default ImageLinkForm;