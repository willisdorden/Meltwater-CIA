const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");
const redactController = require("../controllers/redact.controller");

let routes = (app) => {
    router.post("/upload/:name", fileController.upload);
    router.get("/files", fileController.getListFiles);
    router.get("/files/:name", fileController.download);
    router.post('/redact/file', redactController.redactFile)
    router.get('/search/word/:word', redactController.searchWord)
    app.use(router);
};

module.exports = routes;
