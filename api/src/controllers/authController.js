const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const {socket} = require('../../socket');

module.exports = {
    autenticarUsuario: async (req, res) => {
        
        const {email, password} = req.body;

        const uuid = uuidv4();

        try{

            let usuario = await Usuario.findOne({email});
            
            if(!usuario){
                return res.status(404).json({msg: 'La cuenta no existe'});
            }

            const passCorrecto = await bcryptjs.compare(password, usuario.password);
            if(!passCorrecto){
                return res.status(400).json({msg: 'La contraseña es incorrecta'})
            }

            usuario.uuid = uuid;
            await usuario.save();

            socket.io.emit(`${usuario._id}:registro`, {});

            // Crear y firmar el jwt
            const payload = {
                usuario: {
                    id: usuario._id,
                    role: usuario.role,
                    bloqueado: usuario.bloqueado,
                    uuid: uuid
                }
            };

            // firmar el jwt
            jwt.sign(payload, process.env.SECRETA, { 
                expiresIn: 54000
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

        const {uuid} = req.usuario;

        try{

            const usuario = await Usuario.findById(req.usuario.id).select('-password');

            if(usuario.uuid !== uuid){
                res.status(401).json({msg: 'Han iniciado sesión en otro sitio'});
                return;
            }

            res.json(usuario);

        }
        catch(err){
            console.log(err);
            res.status(401).json({msg: 'Hubo un error'});
        }
    }
}
