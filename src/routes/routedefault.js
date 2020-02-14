const express = require('express');
const pool = require('../config/database');

const app = express();

app.get('/routedefault', (req, res, next) => {

    res.status(200).json({
        ok: true,
        message: 'Endpoint ok!'
    });
});


module.exports = app;