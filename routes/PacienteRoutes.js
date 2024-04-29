import checkAuth from "../Middleware/authMIddleware.js";

const express =require("express");
const { agregarPaciente, obtenerPacientes } = require("../controllers/pacienteControles");
const router = express.Router();
const middleware = require("../Middleware/authMIddleware.js");

router
.route('/')
.post(checkAuth, agregarPaciente)
.get(checkAuth, obtenerPacientes)


router
.route('/:id')
.get( checkAuth, conseguirPacientes)
.put(checkAuth, actualizaPaciente)
.delete(checkAuth, eliminarPaciente)

export default router;

module.exports(router, middleware);