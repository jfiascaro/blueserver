require('./config/config');
const express = require('express');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

//Add to fix CORS error in Angular
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*"); //Permite todos los métodos de peticiones
    next();
})

// Server index config (opcional es el para el uso del FileSystem)
// let serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(require('./routes/index'));
//console.clear();

app.listen(process.env.PORT);
console.log('listen on: ', process.env.PORT);