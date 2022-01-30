import './App.css';
import UploadFile from "./components/UploadFile";
import RedactedWords from "./components/RedactedWords";
import {useState} from "react";

function App() {
    const [fileName, setFileName] = useState();
    const fileNameHandler = (fileName) => {
        setFileName(fileName);
    }

  return (
    <div className="App">
            <UploadFile name={fileNameHandler}/>
            <RedactedWords name={fileName}/>
        {/*save the words in a fake back in and has the redact name and the unredact name with each word.
        So you can type in the redacted word and search backend and display the redacted and unredacted text files so you can down load them.*/}

    </div>
  );
}

export default App;
