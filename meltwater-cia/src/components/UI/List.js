import {ListItem, Typography} from "@mui/material";
import '../UploadFile.css'

const List = (props) => {
    return (
        <div className='list-container' >
            <Typography variant="h6" className="list-header">
                {props.typography}
            </Typography>
            <ul className="list-group">
                {props.array &&
                    props.array.map((file, index) => (
                        <ListItem
                            divider
                            key={index}>
                            <a href={file.url ? file.url : null}>{file.name ? file.name : file}</a>
                        </ListItem>
                    ))}
            </ul>
        </div>
    )
}

export default List;
