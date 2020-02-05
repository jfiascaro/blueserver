const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const app = express();


app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const values = {
        email,
        password
    };
    await pool.query('SELECT * FROM users WHERE email = ?', [values.email], (err, user) => {
        // Error en DB
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        // Usuario no encontrado
        if (user == 0) {
            return res.status(401).json({
                ok: false,
                error: {
                    mensaje: 'Usuario o Contraseña incorrecta'
                }
            });
        }

        // Contraseña incorrecta
        if (!bcrypt.compareSync(values.password, user[0].password)) {
            return res.status(401).json({
                ok: false,
                error: {
                    mensaje: 'Usuario o Contraseña incorrecta'
                }
            });
        }

        delete user[0].password;

        let token = jwt.sign({
            user: user[0]
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            user: user,
            token
        });
    });






})

module.exports = app;