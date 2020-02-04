const express = require('express');
const app = express();

app.use(require('./organizations'));
app.use(require('./users'));

module.exports = app;