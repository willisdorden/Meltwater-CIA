import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
const Input = styled('input')({
    display: 'none',
});

const FileButton = (props) => {
    const className = `button ${props.type}`

    return (
        <label htmlFor="contained-button-file">
            <Input id="contained-button-file" multiple type="file" onChange={props.handleChangeHandler} />
        <Button variant={props.variant} component="span" className={className} onClick={props.handleClick}>
            {props.label}
        </Button>
        </label>
    );
}

Button.defaultProps = {
    type: "secondary"
};

export default FileButton;
