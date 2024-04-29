const redisClient = require("../config/redis");
const Veterinario = require("./Veterianarion");

const PacienteSchema = {

{
    nombre:{
        type: String,
        required: true,
    },
    propietario: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    nombre: {
        type: Date,
        required: true,
    },
    nombre: {
        type: String,
        required: true,

    },

    veterinario:{
        ref: "Veterinario",
    }
},

timestamps: true,

};

const Paciente = mongoose.model('Paciente', Paciente)

export default Paciente;
