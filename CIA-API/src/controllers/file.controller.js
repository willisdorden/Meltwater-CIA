const fs = require('fs');
const uploadFile = require("../middleware/upload");
const baseUrl = "http://localhost:8080/files/";

const upload = async (req, res) => {
    try {
        //check and see if file is already in the folder
        const directoryPath = __basedir + "/resources/assets/uploads/" + req.params.name;
        if (fs.existsSync(directoryPath)) {
            res.status(202).send({
                message: "File Name: " + req.params.name + " already exist!" ,
            });
        } else {
            await uploadFile(req, res);

            if (req.file === undefined) {
                return res.status(400).send({ message: "Please upload a file!" });
            }

            res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
            });
        }
    } catch (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/assets/uploads/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/assets/uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

module.exports = {
    upload,
    getListFiles,
    download,
};
