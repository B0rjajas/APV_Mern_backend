import Veterinario from "../models/Veterinario"; // Importa el modelo de Veterinario desde un archivo

const jwt = require("jsonwebtoken"); // Importa la biblioteca 'jsonwebtoken' para manejar tokens JWT

const checkAuth = async (req, res, next) => { // Define una función middleware llamada checkAuth que toma los objetos req, res y next como argumentos
    let token; // Declara una variable llamada token

    if ( // Verifica si la solicitud contiene una cabecera de autorización con un token JWT
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extrae el token de la cabecera de autorización
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica y decodifica el token JWT utilizando la clave secreta JWT_SECRET almacenada en variables de entorno
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado"); // Busca al veterinario correspondiente al ID decodificado del token y lo almacena en req.veterinario
            return next(); // Llama al siguiente middleware en la cadena de middleware
        } catch (error) { // Captura cualquier error que ocurra durante la verificación o decodificación del token JWT
            const e = new Error("Token no válido"); // Crea un nuevo error con el mensaje "Token no válido"
            res.status(403).json({ msg: e.message }); // Envía una respuesta de error con el código de estado 403 (Prohibido) y el mensaje de error
        }
    }

    if (!token) { // Verifica si no se encontró un token en la cabecera de autorización
        const error = new Error("Token no válido o inexistente"); // Crea un nuevo error con el mensaje "Token no válido o inexistente"
        res.status(403).json({ msg: error.message }); // Envía una respuesta de error con el código de estado 403 (Prohibido) y el mensaje de error
    }

    next(); // Llama al siguiente middleware en la cadena de middleware
};

export default checkAuth; // Exporta la función middleware checkAuth para que pueda ser utilizada en otras partes de la aplicación
