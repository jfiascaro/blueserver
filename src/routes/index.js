const express = require('express');
const app = express();

app.use(require('./organizations'));
app.use(require('./users'));
app.use(require('./login'));
app.use(require('./areas'));
app.use(require('./people'));
app.use(require('./uploads'));
app.use(require('./img'));

module.exports = app;