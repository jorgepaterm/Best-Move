const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {socket} = require('../../socket');

module.exports = {
    autenticarUsuario: async (req, res) => {
        
        const {email, password} = req.body;

        try{

            let usuario = await Usuario.findOne({email});
            
            if(!usuario){
                res.status(404).json({msg: 'La cuenta no existe'});
            }

            const passCorrecto = await bcryptjs.compare(password, usuario.password);
            if(!passCorrecto){
                return res.status(400).json({msg: 'La contraseña es incorrecta'})
            }

            // prueba sokect 
            socket.io.emit('mensaje', 'Bienvenido');

            // Crear y firmar el jwt
            const payload = {
                usuario: {
                    id: usuario._id
                }
            };

            // firmar el jwt
            jwt.sign(payload, process.env.SECRETA, { 
                expiresIn: 3600
            }, (err, token) => {
                if(err) throw err;
                res.json({token});
            })

        }
        catch(err){
            console.log(err);
            res.status(404).json({msg: 'Hubo un error'});
        }
    },

    usuarioAutenticado: async (req, res) => {

        try{

            const usuario = await Usuario.findById(req.usuario.id).select('-password');

            res.json(usuario);

        }
        catch(err){
            console.log(err);
            res.status(401).json({msg: 'Hubo un error'});
        }
    }
}
