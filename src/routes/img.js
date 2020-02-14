const express = require('express');
const pool = require('../config/database');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/img/:type/:img', (req, res, next) => {

    let type = req.params.type;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname, `../uploads/${type}/${img}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        let pathNoImg = path.resolve(__dirname, '../assets/no-img.jpg');
        res.sendFile(pathNoImg);
    }
});


module.exports = app;