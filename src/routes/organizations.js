const express = require('express');
const pool = require('../config/database');

const app = express();

// Create 
app.post('/organizations', async(req, res) => {
    const { name, email, url, logo } = req.body;
    const values = {
        name,
        email,
        url,
        logo
    };
    await pool.query('INSERT INTO organizations set ?', [values], (err, resDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            values.id = resDB.insertId;
            return res.json({
                ok: true,
                organizations: values
            });
        }
    });

});

// Read
app.get('/organizations/list', async(req, res) => {
    await pool.query('SELECT * FROM organizations', (err, resDB) => {
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
                organizations: resDB
            });
        };

    });

});

// Read by id
app.get('/organizations/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('SELECT * FROM organizations WHERE id = ?', [id], (err, resDB) => {

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
                organizations: resDB[0]
            });
        };


    });


});

// Update by id
app.put('/organizations/:id', async(req, res) => {

    const { id } = req.params;
    const { name, email, url, logo } = req.body;
    const values = {
        name,
        email,
        url,
        logo
    };

    await pool.query('UPDATE organizations set ? WHERE id = ?', [values, id], (err, resDB) => {

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
                organizations: values
            });
        }
    })
});

// Delete by id
app.delete('/organizations/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM organizations WHERE id = ?', [id], (err, resDB) => {
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
app.get('/organizations/search/:term', async(req, res) => {
    const { term } = req.params;
    termino = '%' + term + '%'
    await pool.query('SELECT * FROM organizations WHERE name LIKE ?', [termino], (err, resDB) => {

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
                organizations: resDB
            });
        }
    });


});

app.get('/organizations', async(req, res) => {


    res.json({
        create: 'post: organizations',
        read: 'get: organizations/list',
        readbyid: 'get: organizations/:id',
        update: 'put: organizations/:id',
        delete: 'delete: organizations/:id',
        search: 'get: organizations/search/:term'
    })
})





module.exports = app;