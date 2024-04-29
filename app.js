// app.js

const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const redisClient = require("./config/redis.js"); // Importar la configuración de Redis
const veterinarioRouter02 = require("./routes/veterinarioRoutes02.js");

const app = express();
dotenv.config();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del Request está permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
};


app.use(cors(corsOptiopn))

// No es necesario llamar a conectarDB(); si estás utilizando directamente redisClient

app.use("/api/veterinarios", veterinarioRouter02); // Esta línea parece ser la causa del error

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Inician desde la puerta galáctica ${PORT}`);
});

app.use('/', (req, res) => {
    res.send('Hola Marcion!!!!');
});
