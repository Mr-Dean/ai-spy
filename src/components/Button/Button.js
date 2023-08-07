import './button.styles.css';

const Button = ({handleCLick, text}) => {
    return <button onClick={handleCLick}>{text}</button>
}

export default Button;