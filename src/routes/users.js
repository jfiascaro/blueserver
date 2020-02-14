const express = require('express');
const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const { authToken } = require('../middlewares/authentication');

const app = express();


// Create 
app.post('/users', async(req, res) => {
    const { id_person, username, email, password } = req.body;
    const values = {
        id_person,
        username,
        email,
        password: bcrypt.hashSync(password, 10)
    };
    await pool.query('INSERT INTO users set ?', [values], (err, resDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            values.id = resDB.insertId;
            delete values.password;
            return res.json({
                ok: true,
                users: values
            });
        };
    });

});

// Read
app.get('/users/list', async(req, res) => {
    await pool.query('SELECT * FROM users', (err, resDB) => {
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
            //delete users.password;
            return res.json({
                ok: true,
                users: resDB
            })
        };

    });

});

// Read by id
app.get('/users/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('SELECT * FROM users WHERE id = ?', [id], (err, resDB) => {

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
            delete resDB[0].password
            return res.json({
                ok: true,
                users: resDB[0]
            });
        }
    });


});

// Update by id
app.put('/users/:id', async(req, res) => {

    const { id } = req.params;
    const { id_person, username, email, password } = req.body;

    const values = {
        id_person,
        username,
        email,
        //password: bcrypt.hashSync(password, 10)
    }
    if (!password === undefined) {
        values.password = bcrypt.hashSync(password, 10);
    }

    await pool.query('UPDATE users set ? WHERE id = ?', [values, id], (err, resDB) => {

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
            delete values.password;
            return res.json({
                ok: true,
                users: values
            });
        }
    })
});

// Delete by id
app.delete('/users/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = ?', [id], (err, resDB) => {
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
app.get('/users/search/:term', async(req, res) => {
    const { term } = req.params;
    termino = '%' + term + '%'
    await pool.query('SELECT * FROM users WHERE email LIKE ?', [termino], (err, resDB) => {

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
                users: resDB
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