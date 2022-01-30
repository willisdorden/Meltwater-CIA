const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";
const sqlite3 = require('sqlite3').verbose();


const redactFile = async (req, res) => {
    try {
        const name = req.body.name;
        const words = req.body.redactedWords
        const redactedName = 'Redacted' + name

        fs.readFile( __basedir + "/resources/assets/uploads/" + name, 'utf-8', (err, data) => {
            if(err) {
                return console.log(err);
            }
            const regexFromMyArray = new RegExp(words.join("|"), 'gi');
            const document = data.replace(regexFromMyArray, 'xxxxx')
            fs.writeFile(__basedir + "/resources/assets/uploads/"+ redactedName , document, 'utf8', function (err) {
                if (err) return console.log(err);
            });
            insertDataIntoDb(words,name,redactedName)
            res.status(200).send({
                message: "File has been Redacted",
            });
        })
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
}

const searchWord = async (req, res) => {
    let fileInfos = []
    const data = await getDataFromDB(req.params.word);

    fileInfos.push({
        name: data.fileName,
        url: baseUrl + data.fileName,
    });
    fileInfos.push({
        name: data.redactedFileName,
        url: baseUrl + data.redactedFileName,
    })

    res.status(200).send(fileInfos);

}
const insertDataIntoDb = (words, originalFileName, redactedFileName) => {

    let db = new sqlite3.Database('./db/meltwaterDB.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    let sql = `INSERT INTO RedactedWords (
                              fileName,
                              redactedFileName,
                              words
                          )
                          VALUES (?,?,?)`

    db.run(sql,[originalFileName, redactedFileName,  words.join()], (err) => {
        if (err) {
            return console.log(err.message)
        }
        console.log('A row has been inserted')
    })

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

const getDataFromDB = async (word) => {
    let db = new sqlite3.Database('./db/meltwaterDB.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    let sql = `SELECT id,
                      fileName,
                      redactedFileName,
                      words
               FROM RedactedWords
               where words LIKE ?`;

    return new Promise((resolve, reject) => {
        db.get(sql,[`%${word}%`], (err, row) => {
            if (err) {
                reject(err);
            }

            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Close the database connection.');
            });
            resolve(row)
        });
    })
}

module.exports = {
    redactFile,
    searchWord
}
