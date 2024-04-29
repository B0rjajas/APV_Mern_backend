    const express = require("express");
    const router = express.Router();
    const redisClient = require("../config/redis.js");



    // Ruta para registrar un nuevo usuario
    router.post("/registrar", validarDatosRegistro, async (req, res) => {
    try {
        // Obtener datos del cuerpo de la solicitud
        const { nombre, email } = req.body;

        // Almacenar datos del usuario en Redis
        redisClient.hset('usuarios', email, JSON.stringify({ nombre, email }));

        res.json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    });

    // Ruta para obtener datos del usuario
    router.get("/perfil", async (req, res) => {
    try {
        // Obtener email del usuario desde la solicitud
        const { email } = req.query;

        // Obtener datos del usuario desde Redis
        redisClient.hget('usuarios', email, (error, data) => {
        if (error) {
            console.error('Error al obtener datos del usuario:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (!data) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const usuario = JSON.parse(data);
        res.json(usuario);
        });
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    });

    module.exports = router;
