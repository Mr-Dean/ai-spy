import Button from '../Button/Button';
import './imageFormLink.styles.css';

const ImageLinkForm = ({ handleInput, getData}) => {
    return (
       <div className='form-container'>
        <p>Give me an image and I will tell you what's in it.</p>
        <input type='text' placeholder="Paste a link to an image here..." onChange={handleInput}/> 
        <Button handleCLick={getData} text='DETECT' />
       </div>
    )
}

export default ImageLinkForm;