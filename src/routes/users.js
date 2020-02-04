const express = require('express');
const path = require('path');
const pool = require('../config/database');

const app = express();


// Create 
app.post('/users', async(req, res) => {
    const { id_organization, id_role, username, password, fullname, email, picture } = req.body;
    const values = {
        id_organization,
        id_role,
        username,
        password,
        fullname,
        email,
        picture
    };
    await pool.query('INSERT INTO users set ?', [values], (err, users) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            values.id = users.insertId;
            res.json({
                ok: true,
                users: values
            });
        }
    });

});

// Read
app.get('/users/list', async(req, res) => {
    await pool.query('SELECT * FROM users', (err, users) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });

        } else {
            res.json({
                ok: true,
                users
            })
        };

    });

});

// Read by id
app.get('/users/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('SELECT * FROM users WHERE id = ?', [id], (err, users) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                users: users[0]
            });
        }
    });


});

// Update by id
app.put('/users/:id', async(req, res) => {

    const { id } = req.params;
    const { id_organization, id_role, username, password, fullname, email, picture } = req.body;
    const values = {
        id_organization,
        id_role,
        username,
        password,
        fullname,
        email,
        picture
    };

    await pool.query('UPDATE users set ? WHERE id = ?', [values, id], (err, users) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            values.id = id;
            res.json({
                ok: true,
                users: values
            });
        }
    })
});

// Delete by id
app.delete('/users/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE ID = ?', [id], (err, users) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                users
            });
        }
    })
});

// Search by id
app.get('/users/search/:term', async(req, res) => {
    const { term } = req.params;
    termino = '%' + term + '%'
    await pool.query('SELECT * FROM users WHERE fullname LIKE ?', [termino], (err, users) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                users
            });
        }
    });


});

app.get('/users', async(req, res) => {


    res.json({
        create: 'post: users',
        read: 'get: users/list',
        readbyid: 'get: users/:id',
        update: 'put: users/:id',
        delete: 'delete: users/:id',
        search: 'get: users/search/:term'
    })
})





module.exports = app;