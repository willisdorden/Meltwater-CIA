const fs = require("fs");
const {log} = require("util");
const baseUrl = "http://localhost:8080/resources/assets/uploads/";
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
        })
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
}

const searchWord = async (req, res) => {
    console.log(req.params.word)
    let fileInfos = []
    const data = await getDataFromDB(req.params.word);
    console.log('data', data)
//    make a call to the db and get the name of the files by the search word.

    //this will push into the array the name and the url for each filename in the db.
    // fileInfos.push({
    //     name: fileName,
    //     url: baseUrl + fileName,
    // });

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
        console.log('a row has been inserted')
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
               where words = ?`;

    db.get(sql, [word], (err, row) => {
        if (err) {
            throw err;
        }
        console.log(row)
        return row
    });
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

module.exports = {
    redactFile,
    searchWord
}
