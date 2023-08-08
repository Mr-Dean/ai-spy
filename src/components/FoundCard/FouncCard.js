import './foundCard.styles.css';

const FoundCard = ({found}) => {
    let count = found.reduce(function (value, value2) {
        return (
            value[value2] ? ++value[value2] : (value[value2] = 1),
            value
        );
    }, {});
 
    return (
        <div className='found-card'>
            <h4>I spy with my little ai eye....</h4>
            {
               Object.entries(count).map(([key, value], i) => <p id={i}>{key}: {value}</p>)
            }
        
        </div>
    )
}

export default FoundCard;