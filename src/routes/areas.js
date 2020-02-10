const express = require('express');
const pool = require('../config/database');

const app = express();

// Create 
app.post('/areas', async(req, res) => {
    const { id_organization, name } = req.body;
    const values = {
        id_organization,
        name
    };
    await pool.query('INSERT INTO areas set ?', [values], (err, resDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            values.id = resDB.insertId;
            return res.json({
                ok: true,
                areas: values
            });
        }
    });

});

// Read
app.get('/areas/list', async(req, res) => {
    await pool.query('SELECT * FROM areas', (err, resDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });

        };

        if (resDB.length == 0) {
            return res.status(404).json({
                ok: true,
                mensaje: "No hay registros"
            });
        } else {
            res.json({
                ok: true,
                areas: resDB
            })
        };

    });

});

// Read by id
app.get('/areas/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('SELECT * FROM areas WHERE id = ?', [id], (err, resDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        };

        if (resDB.length == 0) {
            return res.status(404).json({
                ok: true,
                mensaje: "No hay registros"
            });
        } else {
            return res.json({
                ok: true,
                areas: resDB[0]
            });
        }
    });


});

// Update by id
app.put('/areas/:id', async(req, res) => {

    const { id } = req.params;
    const { id_organization, name } = req.body;
    const values = {
        id_organization,
        name
    };

    await pool.query('UPDATE areas set ? WHERE id = ?', [values, id], (err, resDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        };

        if (resDB.affectedRows == 0) {
            return res.status(404).json({
                ok: true,
                mensaje: "No hay registros"
            });
        } else {
            values.id = id;
            return res.json({
                ok: true,
                areas: values
            });
        }
    })
});

// Delete by id
app.delete('/areas/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM areas WHERE id = ?', [id], (err, resDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        };

        if (resDB.affectedRows == 0) {
            return res.status(404).json({
                ok: true,
                mensaje: "No hay registros"
            });
        } else {
            return res.json({
                ok: true,
                mensaje: "Registro eliminado éxitosamente"
            });
        }
    })
});

// Search by id
app.get('/areas/search/:term', async(req, res) => {
    const { term } = req.params;
    termino = '%' + term + '%'
    await pool.query('SELECT * FROM areas WHERE name LIKE ?', [termino], (err, resDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        };

        if (resDB.length == 0) {
            return res.status(404).json({
                ok: true,
                mensaje: "No hay registros"
            });
        } else {
            return res.json({
                ok: true,
                areas: resDB
            });
        }
    });


});

app.get('/areas', async(req, res) => {


    res.json({
        create: 'post: areas',
        read: 'get: areas/list',
        readbyid: 'get: areas/:id',
        update: 'put: areas/:id',
        delete: 'delete: areas/:id',
        search: 'get: areas/search/:term'
    })
})





module.exports = app;