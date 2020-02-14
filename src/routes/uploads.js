const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const pool = require('../config/database');

const app = express();

// default options
app.use(fileUpload());

app.put('/upload/:type/:id', function(req, res) {

    let type = req.params.type;
    let id = req.params.id;

    // Colección de 
    let typeValid = ['people'];

    if (typeValid.indexOf(type) < 0) {
        return res.status(400).send({
            ok: false,
            error: 'Not valid type.'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            ok: false,
            error: 'No files were uploaded.'
        });
    }

    // Obtener extensión del archivo
    let file = req.files.imagen;
    let extFile = file.name.split('.');
    let ext = extFile[extFile.length - 1];

    // Validar extensión del archivo
    let extValid = ['png', 'jpg', 'gif', 'jpeg'];

    if (extValid.indexOf(ext) < 0) {
        return res.status(400).send({
            ok: false,
            error: 'No valid extension.'
        });
    }

    // Asignar un nombre al archivo
    let filename = `img${id}-${new Date().getMilliseconds()}.${ext}`;

    // mover el archivo del tmp a la carpeta destino
    let path = `./src/uploads/${type}/${filename}`;

    file.mv(path, err => {
        if (err) {
            return res.status(500).send({
                ok: false,
                error: 'No file upload',
                err
            });
        }

        uploadByType(type, id, filename, res);


    })

    function uploadByType(type, id, filename, res) {
        // es una por cada tipo
        if (type === 'people') {

            // buscar registro en la DB
            pool.query('SELECT * FROM people WHERE id = ?', [id], (err, resDB) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        err
                    });
                }
                // obtener imagen vieja
                let oldPath = './src/uploads/people/' + resDB[0].photo;
                // borra la imagen vieja si existe
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }

                // actualiza el registro en la DB

                pool.query('UPDATE people set photo = ? WHERE id = ?', [filename, id], (err, response) => {

                    if (err) {
                        res.status(500).json({
                            ok: false,
                            err
                        });
                    };

                    return res.status(200).json({
                        ok: true,
                        message: 'Upload ok',
                        person: resDB[0]
                    });
                });
            });


        }
    }

});


module.exports = app;