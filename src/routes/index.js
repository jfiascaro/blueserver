const express = require('express');
const app = express();

app.use(require('./organization'));

module.exports = app;