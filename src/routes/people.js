const express = require('express');
const pool = require('../config/database');

const app = express();

// Create 
app.post('/people', async(req, res) => {
    const { id_organization, name, lastname, phone, email, address, photo, birthday } = req.body;
    const values = {
        id_organization,
        name,
        lastname,
        phone,
        email,
        address,
        photo,
        birthday
    };
    await pool.query('INSERT INTO people set ?', [values], (err, resDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            values.id = resDB.insertId;
            return res.json({
                ok: true,
                people: values
            });
        }
    });

});

// Read
app.get('/people/list', async(req, res) => {
    await pool.query('SELECT * FROM people', (err, resDB) => {
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
                people: resDB
            })
        };

    });

});

// Read by id
app.get('/people/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('SELECT * FROM people WHERE id = ?', [id], (err, resDB) => {

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
                people: resDB[0]
            });
        }
    });


});

// Update by id
app.put('/people/:id', async(req, res) => {

    const { id } = req.params;
    const { id_organization, name, lastname, phone, email, address, photo, birthday } = req.body;
    const values = {
        id_organization,
        name,
        lastname,
        phone,
        email,
        address,
        photo,
        birthday
    };

    await pool.query('UPDATE people set ? WHERE id = ?', [values, id], (err, resDB) => {

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
                people: values
            });
        }
    })
});

// Delete by id
app.delete('/people/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM people WHERE id = ?', [id], (err, resDB) => {
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
app.get('/people/search/:term', async(req, res) => {
    const { term } = req.params;
    termino = '%' + term + '%'
    await pool.query('SELECT * FROM people WHERE name LIKE ?', [termino], (err, resDB) => {

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
                people: resDB
            });
        }
    });


});

app.get('/people', async(req, res) => {


    res.json({
        create: 'post: people',
        read: 'get: people/list',
        readbyid: 'get: people/:id',
        update: 'put: people/:id',
        delete: 'delete: people/:id',
        search: 'get: people/search/:term'
    })
})





module.exports = app;