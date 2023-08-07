const FoundCard = ({found}) => {
    let count = found.reduce(function (value, value2) {
        return (
            value[value2] ? ++value[value2] : (value[value2] = 1),
            value
        );
    }, {});
 
    return (
        <div>
            <p>I spy with my little ai eye....</p>
            {
               Object.entries(count).map(([key, value], i) => <p id={i}>{key}</p>)
            }
        
        </div>
    )
}

export default FoundCard;