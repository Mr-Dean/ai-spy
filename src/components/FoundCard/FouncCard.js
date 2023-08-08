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
            <p>I spy with my little ai eye....</p>
            {
               Object.entries(count).map(([key, value], i) => <p key={i}>{key} x {value}</p>)
            }
        
        </div>
    )
}

export default FoundCard;