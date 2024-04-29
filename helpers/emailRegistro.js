const nodemailer = require('nodemailer')
const emailRegistro = () => {

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
            subject: ' Comprueba tu cuenta en APV',
            text: 'Compureba tue cuenta en APV',
            html:`<p>Hola: ${nombre}, comprubea tu cuenta en APV </p>
            <p>Tu cuenta ua esta lista en APV</p>
            <a href="${process.env.FRONTEND_URL}">Comprobar Cuenta </a
            <p>Si tu no creaste este cuenta, olvida estemensaje</p>`
        })
}

export default emailRegistro;