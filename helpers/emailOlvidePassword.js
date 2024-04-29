const nodemailer = require('nodemailer')
const emailOlvidePassword = () => {

    var transport = nodemailer.createTransport(
        {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
        const { email, nombre, token } = datos;

        //ENVIAR EL EMAIL
        const info = await transporter.sendMail({
            from: "APV . ADministrador de PAcientes de Veterinarioas",
            to: email,
            subject: ' Restablece tu COntraseña',
            text: 'Restablece tu COntraseña',
            html:`<p>Hola: ${nombre}, Restablece tu COntraseña </p>
            <p>Sigue el siguinete enlace</p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Comprobar Cuenta </a
            <p>Si tu no creaste este cuenta, olvida estemensaje</p>`
        })
}

export default emailOlvidePassword;