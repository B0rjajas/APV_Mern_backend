const redisClient = require("../config/redis");
const generarID = require("../helpers/generadid")
const bcrypt = require("bcrypt");

// Definir nombre SCHEMA (tabla) utilizando mongoose (solo para la estructura)
const veterinarioSchema = {
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: String, // Aquí se define como un campo String
    confirmado: {
        type: Boolean, // Se corrigió el typo de 'confimardo' a 'confirmado'
        default: false
    }
};

veterinarioSchema.pre('save', async function() {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

veterinarioSchema.methods.compararPassword = async function(passwordFormulario)
    
{
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Veterinario = redisClient.model("Veterinario", veterinarioSchema);

module.exports = Veterinario;