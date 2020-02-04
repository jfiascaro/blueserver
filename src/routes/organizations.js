const express = require('express');
const path = require('path');
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
    await pool.query('INSERT INTO organizations set ?', [values], (err, organizations) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            values.id = organizations.insertId;
            res.json({
                ok: true,
                organizations: values
            });
        }
    });

});

// Read
app.get('/organizations/list', async(req, res) => {
    await pool.query('SELECT * FROM organizations', (err, organizations) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });

        } else {
            res.json({
                ok: true,
                organizations: organizations
            })
        };

    });

});

// Read by id
app.get('/organizations/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('SELECT * FROM organizations WHERE id = ?', [id], (err, organizations) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                organizations: organizations[0]
            });
        }
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

    await pool.query('UPDATE organizations set ? WHERE id = ?', [values, id], (err, organizations) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            values.id = id;
            res.json({
                ok: true,
                organizations: values
            });
        }
    })
});

// Delete by id
app.delete('/organizations/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM organizations WHERE ID = ?', [id], (err, organizations) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                organizations
            });
        }
    })
});

// Search by id
app.get('/organizations/search/:term', async(req, res) => {
    const { term } = req.params;
    termino = '%' + term + '%'
    await pool.query('SELECT * FROM organizations WHERE name LIKE ?', [termino], (err, organizations) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                organizations: organizations
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