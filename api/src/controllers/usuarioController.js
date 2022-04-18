const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { socket } = require('../../socket.js');

module.exports = {
    crearUsuario: async (req, res) => {
        
        const {nombre, apellido, email, password, dni, role} = req.body;

        const uuid = uuidv4();

        try{

            const salt = await bcryptjs.genSalt(10);
            newPassword = await bcryptjs.hash(password, salt);

            
            
            const usuario = await new Usuario({
                nombre,
                apellido,
                email,
                password: newPassword,
                dni,
                role,
                uuid,
            })
            usuario.save();
            
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
            });
        }
        catch(err){
            console.log(err);
            res.status(404).json({msg: 'Hubo un error'});
        }
    },

    getUsers: async (req, res) => {

        if(req.usuario.role !== 'admin'){
            res.status(401).json({msg: 'Usuario no autorizado'})
        }

        try{

            const usuarios = await Usuario.find();

            res.json(usuarios);
        }
        catch(err){
            console.log(err);
            res.status(404).json({msg: 'Hubo un error'});
        }
    },

    blockUser: async (req, res) => {

        const {id, bloquear} = req.body;

        if(req.usuario.role !== 'admin'){
            res.status(401).json({msg: 'Usuario no autorizado'});
        }

        try{

            const usuario = await Usuario.findOneAndUpdate({_id: id}, {
                bloqueado: bloquear
            },{
                new: true
            });

            socket.io.emit(`${id}:noti`, {bloqueado: usuario.bloqueado});

            if(bloquear === true) {
                res.json({state: true, msg: `Usuario bloqueado`, usuario});
                return;
            }
            else {
                res.json({state: true, msg: `Usuario desbloqueado`, usuario});
            }
            

        }
        catch(err){
            console.log(err);
            res.status(404).json({state: false, msg: 'Hubo un error'});
        }
    },

    changePassword: async (req, res) => {

        const {newPassword, id} = req.body

        if(req.usuario.role !== 'admin'){
            res.status(401).json({msg: 'Usuario no autorizado'});
        }

        try{

            const salt = await bcryptjs.genSalt(10);
            password = await bcryptjs.hash(newPassword, salt);

            const usuario = await Usuario.findOneAndUpdate({_id: id}, {
                password
            },{
                new: true
            })

            res.json({editado: true, msg: 'Usuario editado con exito', usuario})
        }
        catch(err){
            console.log(err);
            res.status(404).json({editado: false, msg: 'Hubo un error'});
        }
    }
}
