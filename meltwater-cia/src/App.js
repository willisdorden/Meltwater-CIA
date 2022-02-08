import './App.css';
import UploadFile from "./components/UploadFile";
import RedactedWords from "./components/RedactedWords";
import {useEffect, useState} from "react";
import UploadService from "./services/UploadFiles.service";

function App() {
    const [fileName, setFileName] = useState();
    const [fileInfos, setFileInfos] = useState([]);

    useEffect(() => {
        UploadService.getFiles().then((response) => {
            setFileInfos(response.data)
        });
    },[]);

    const fileNameHandler = (fileName) => {
        setFileName(fileName);
    }

  return (
    <div className="App">
            <UploadFile name={fileNameHandler} fileInfos={fileInfos} setFileInfos={setFileInfos}/>
            <RedactedWords name={fileName} setFileName={setFileInfos}/>
    </div>
  );
}

export default App;
