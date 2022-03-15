const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
// const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const enviarMail = async (req, res, next) => {

    const {verificado} = req.query;
    const {email, dni} = req.body;

    if(verificado === 'true'){
        return next();
    }

    try{

        // verificar que no haya un usuario con el mismo email o con el mismo dni
        // const emailExistente = await Usuario.findOne({$or: [{email, dni}]});
        let usuario;
        usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(404).json({msg: 'Ya existe un usuario con esté email'});
        }

        usuario = await Usuario.findOne({dni});
        if(usuario){
            return res.status(404).json({msg: 'Ya existe un usuario con esté documento'});
        }

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

        // const salt = await bcryptjs.genSalt(10);
        // const numCryp = await bcryptjs.hash(num, salt);

        const payload = {
            num,
            usuario: req.body
        };

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
