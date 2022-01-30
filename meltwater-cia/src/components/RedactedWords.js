import Card from "./UI/Card";
import {TextField, Typography} from "@mui/material";
import {useState} from "react";
import './RedactedWords.css';
import MyButton from "./UI/Button";
import Stack from "@mui/material/Stack";
import List from "./UI/List";
import RedactFileService from "../services/RedactFile.service";

const RedactedWords = (props) => {
    const [redactedWords, setRedactedWords] = useState(undefined);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState();
    const [fileName, setFileName] = useState();
    const [searchWord, setSearchWord] = useState()

    const handleChangeHandler = (event) => {
        event.preventDefault();
        setRedactedWords(event.target.value.split(/"(.*?)"|'(.*?)'|[ ,]+/g).filter(Boolean))
        setFileName(props.name);
        console.log(redactedWords);
    }

    const handleClickHandler = () => {
        const data = {
            name: fileName,
            redactedWords: redactedWords,
        }
        console.log('data', data)
        RedactFileService.redactFile(data)
            .then((response) => {
                console.log(response)
                setIsError(false);
            })
            .catch(() => {
                setMessage( "Could not upload the file!")
                setIsError(true)
            });

    }

    const handleSearchWordHandler = (event) => {
        setSearchWord(event.target.value)
    }

    const handleSearchWordClickHandler = () => {
        // const word = {
        //     word: searchWord
        // }
        RedactFileService.searchWord(searchWord)
            .then((response) => {
                console.log(response)
            })
            .catch(() => {
                setMessage( "Could not search for Word!")
                setIsError(true)
            });

    }

    return (
        <Card className='redacted-container'>
            <Stack direction="row" alignItems="center" spacing={5}>
                <TextField
                    className='text-field'
                    id="text"
                    label="Redacted Words"
                    size="small"
                    variant='standard'
                    color='warning'
                    focused
                    onChange={handleChangeHandler}
                />
                <MyButton
                    className='redacted-button'
                    label="Redact"
                    variant='contained'
                    disabled={!redactedWords}
                    handleClick={handleClickHandler}
                />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={5}>
                <TextField
                    className='text-field'
                    id="text"
                    label="Search By Words"
                    size="small"
                    variant='standard'
                    color='secondary'
                    focused
                    onChange={handleSearchWordHandler}
                />
                <MyButton
                    className='redacted-button'
                    label="Search"
                    variant='contained'
                    disabled={!redactedWords}
                    handleClick={handleSearchWordClickHandler}
                />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={5}>
                <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                    {message}
                </Typography>
                {redactedWords && redactedWords.length > 0 && (
                    <List
                        typography="Redacted Words"
                        array={redactedWords}
                    />
                )}
            </Stack>
        </Card>
    )
}

export default RedactedWords
