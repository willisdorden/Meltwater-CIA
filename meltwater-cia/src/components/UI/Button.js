import Button from "@mui/material/Button";
import './Button.css';

const MyButton = (props) => {
    const className = `button ${props.type}`
    return (
            <Button variant={props.variant} component="span" className={className} onClick={props.handleClick}>
                {props.label}
            </Button>
    );
}

export default MyButton
