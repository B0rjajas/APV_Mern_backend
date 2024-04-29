    const Veterinario = require("../models/Veterianarion");
    const generarJWT = require("../helpers/generarJWT");
    const emailRegistro = requiere("../helpers/emailRegistro.js")
    const { default: generarID } = require("../helpers/generarid");
    const emailOlvidePassword = require("../helpers/emailOlvidePassword.js")

    const registrar = async (req, res) => {

        const { email } = req.body;
        //revenir DUplciados 
        const existeUsario = await Veterinario.findONe({ email});
        if(existeUsario) {
            const existeUsario = new Error("Usuario ya registradoo");
            return res.status(400).json({msg: error.mesage})
        } try {
            // Guardar un Nuevo Veterinario
            const veterinario = new Veterinario(req.body);
            const veterinarioGuardado = await veterinario.save();

            //EMAIL REGISTRO
            emailRegistro   ({
                email,
                nombre,
                token: veterinarioGuardado.token,
            });


            res.json( veterinarioGuardado);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error al registrar el usuario" });
        }
    };

    const perfil = (req, res) =>{
        const { veterinario } = req;
        res.json({ perfil: veterinario})
    }


    const confirmar =  async(req,res) => {
        const { token } = req.params
        
        const usuarioConfirmar = await Veterinario.findONe({ token})

        if(usuarioConfirmar){
            const error = new Error('Token no encontrado')
            return res.status(404).json({ msg: error.message})

        }

        try {
            usuarioConfirmar.token = null
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()

            res.json({ msg: "Usuario Confirmado correctamente"})
        } catch (error) {
            console.log(error)
            
        }
        res.json({ msg: "Confirmando cuenta..."})
    }



    const autenticar = async (req, res) => {
        const { email, password } = req.body;
    
        const usuario = await Veterinario.findOne({ email }); // El método correcto es findOne en lugar de findONe
    
        if (!usuario) {
            const error = new Error('El usuario no existe...');
            return res.status(404).json({ msg: error.message });
        }
        //Comprobar si el USario esta confirmado
        if(!usuario.confirmado){
            const error = new Error("Tu cuenta no ha sido confirmado")
            return res.status(404).json({ msg: error.message})

        }
        //Revisar el password
        if( await usuario.comprobarPassword(password)){
            //AUTENTICAR 
           res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
           })
        }else {
            const error = new Error("Tu cuenta no ha sido confirmado")
            return res.status(404).json({ msg: error.message})

        }

    };


    const olvidePassword = async (req, res) => { // Agrega la palabra clave async para indicar que esta función es asíncrona
        const { email } = req.body;
    
        
            const existeVeterinario = await Veterinario.findOne({ email }); // Utiliza el método findOne para buscar un veterinario por su email
    
            if (!existeVeterinario) { // Si no existe el veterinario con ese email, devuelve un error
                const error = new Error("El Usuario no existe");
                return res.status(400).json({ msg: error.message });
            }

            try {
            existeVeterinario.token = generarID(); // Genera un nuevo token para el veterinario
            await existeVeterinario.save(); // Guarda el veterinario en la base de datos con el nuevo token
    
                //Enviar Email con Instrucciones
                emailOlvidePassword({
                    email,
                    nombre: existeVeterinario.nombre.
                    token: existeVeterinario.token
                })

            res.json({ msg: 'Hemos enviado un email con la nueva contraseña' }); // Devuelve un mensaje indicando que se ha enviado un email con la nueva contraseña
        } catch (error) { // Maneja los errores que puedan ocurrir durante la búsqueda o la actualización del veterinario
            console.log(error); // Registra el error en la consola
            res.status(500).json({ error: "Error al procesar la solicitud" }); // Devuelve un mensaje de error genérico al cliente
        }
    };
    


    const nuevoPasword = async (req, res) => { // Debes agregar la palabra clave async para indicar que esta función es asíncrona
        const { token } = req.body;
        console.log(token); // Se imprime el token recibido en la consola
        const { password } = req.body;
    
        try {
            const veterinario = await Veterinario.findOne({ token }); // Utiliza el método findOne para buscar un veterinario por su token
    
            if (!veterinario) { // Si no se encuentra un veterinario con ese token, devuelve un error
                const error = new Error("Hubo un error");
                return res.status(400).json({ msg: error.message });
            }
    
            veterinario.token = null; // Anula el token del veterinario
            veterinario.password = password; // Asigna el nuevo password al veterinario
            await veterinario.save(); // Guarda los cambios en la base de datos
    
            
            
            res.json({ msg: "Password modificado correctamente" }); // Devuelve un mensaje indicando que el password se ha modificado correctamente
        } catch (error) { // Maneja los errores que puedan ocurrir durante la búsqueda o la actualización del veterinario
            console.log(error); // Registra el error en la consola
            res.status(500).json({ error: "Error al procesar la solicitud" }); // Devuelve un mensaje de error genérico al cliente
        }
    };
    



    const comprobarToken = (req, res) => {

        const { token} = req.params;
        const tokenValido = await Veterinario.findONe({ token })

        if(tokenValido){
            //El toekn es válido el usario exite
        }else{
            const error = new Error('Token no válido')
            return res.status(400).json({ msg: error.message})
        }
    }



    module.exports = { registrar, perfil, confirmar, autenticar, olvidePassword, nuevoPasword, comprobarToken };
