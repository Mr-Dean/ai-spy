import './displayImage.styles.css';

const DisplayImage = ({imageUrl}) => {
    return (
        <div className="image-container">
            <img className='image' src={imageUrl} alt="" />
        </div>
    )
}

export default DisplayImage;