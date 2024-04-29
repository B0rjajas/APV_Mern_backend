
const Paciente = require('../models/Paciente');

const agregarPaciente = async (req,res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteGuardado = await paciente.save()
        res.json(pacienteGuardado)
    } catch (error) {
        
    }
};
const obtenerPacientes = async (req, res) =>{
    const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);


    res.json(pacientes);
}

const conseguirPaciente = async ( req, res) => {
    const { id } = req.params;
    const pacientes = await Paciente.findbyID(id);
    
    if( pacientes.veterinario._id.toString() != req.veterinario._id.toString()){
        return res.status(404).json({ msg: "No encontrado"})
    }
    if(pacientes.veterinario._id.toString() !== ){
        return res.json({ msg: "Accion no valida"});
    }
};


const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const pacientes = await Paciente.findbyID(id);
    
    if( pacientes.veterinario._id.toString() != req.veterinario._id.toString()){
        return res.status(404).json({ msg: "No encontrado"})
    }
    if(pacientes.veterinario._id.toString() !== ){
        return res.json({ msg: "Accion no valida"});
    }
    //Actualizar Paciente
        paciente.nombre = req.body.nombre || paciente.nombre
        paciente.propietario = req.body.propietario || paciente.nombre
        paciente.email = req.body.email || paciente.nombre
        paciente.fecha = req.body.fecha || paciente.nombre
        paciente.sintomas = req.body.sintomas  || paciente.nombre
     try {
        const pacinteActualizado = await paciente.save()
        res.json(pacienteActualizado)
        
     } catch (error) {
        console.log(error)
     }
}


const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    const pacientes = await Paciente.findbyID(id);
    
    if( pacientes.veterinario._id.toString() != req.veterinario._id.toString()){
        return res.status(404).json({ msg: "No encontrado"})
    }
    if(pacientes.veterinario._id.toString() !== ){
        return res.json({ msg: "Accion no valida"});
    }

    try {
        await paciente.deleteOne()
        res.json
        
    } catch (error) {
        console.log(error)
        
    }
}

export { 
    agregarPaciente, 
    obtenerPacientes, 
    conseguirPaciente, 
    actualizarPaciente, 
    eliminarPaciente
}