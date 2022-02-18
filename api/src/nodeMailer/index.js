const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

const enviarMail = async (req, res, next) => {

    const {verificado} = req.query;

    if(verificado === 'true'){
        next();
    }

    try{

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.GMAIL, // generated ethereal user
              pass: process.env.GMAIL_PASSWORD, // generated ethereal password
            },
        });
        
        // genero un numero random para la confiemacion del correo
        let num = Math.random();
        num = num.toString();
        num = num.slice(2, 10);
        
        let info = await transporter.sendMail({
            from: '"Best Move" <jespatern@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Hello ✔", // Subject line
            html: `<b>codigo de verificación: ${num} </b>`, // html body
        });


        const payload = {
            num: num,
            usuario: req.body
        };

        console.log(req.body);

        // firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (err, token) => {
            if(err) throw err;
            res.json({info, token, num});
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: 'Hubo un error'});
    }
};

module.exports = enviarMail;
