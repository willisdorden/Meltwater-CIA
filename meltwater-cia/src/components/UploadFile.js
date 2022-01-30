import './UploadFile.css'
import FileButton from "./UI/FileButton";
import Stack from '@mui/material/Stack';
import ProgressBar from "./UI/ProgressBar";
import {useEffect, useState} from "react";
import MyButton from "./UI/Button";
import {ListItem, Typography} from "@mui/material";
import Card from "./UI/Card";
import UploadService from "../services/UploadFiles.service";
import List from "./UI/List";

const UploadFile = (props) => {
    const [selectedFile, setSelectedFile] = useState([]);
    const [showBar, setShowBar] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [fileInfos, setFileInfos] = useState([]);

    useEffect(() => {
        UploadService.getFiles().then((response) => {
          setFileInfos(response.data)
            });
        },[]);

    const handleClickHandler = () => {
        setShowBar(true);

        UploadService.upload(selectedFile[0], (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                console.log(response)
                if (response.status === 202) {
                    setProgress(0)
                    setMessage(response.data.message)
                    setShowBar( false)
                    setIsError(true)
                    return UploadService.getFiles();
                } else {
                    setMessage(response.data.message);
                    setIsError(false);
                    return UploadService.getFiles();
                }
            })
            .then((files) => {
                setFileInfos(files.data);
            })
            .catch(() => {
                setProgress(0)
                setMessage( "Could not upload the file!")
                setShowBar( false)
                setIsError(true)
                });
    }

    const handleChangeHandler = (event) => {
        setSelectedFile(event.target.files)
        props.name(event.target.files[0].name);
    }

    return (
        <Card className='upload-container'>
            {showBar && (
        <ProgressBar progress={progress} />)}
        <Stack direction="row" alignItems="center" spacing={2}>
            <FileButton
                label="Choose File"
                type="primary"
                variant='outlined'
                handleChangeHandler={handleChangeHandler}
            />
            <MyButton
                type='btn-upload'
                label='Upload'
                variant='contained'
                disabled={!selectedFile}
                handleClick={handleClickHandler}
            />
            <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                {message}
            </Typography>
        </Stack>
            <Stack direction="row" alignItems="center" spacing={5}>
                {selectedFile && selectedFile.length > 0 && (<div className='file-name'>
                    <Typography variant="h6" className="file-header">
                        UpLoaded File
                    </Typography>
                    <a>{selectedFile && selectedFile.length > 0 ? selectedFile[0].name : null}</a>
                </div>)}
                {fileInfos && fileInfos.length > 0 && (
                    <div className='list-container' >
                        <List
                            typography="List of Files"
                            array={fileInfos}
                        />
                    </div>
                )}
            </Stack>
        </Card>
    )
}

export default UploadFile
