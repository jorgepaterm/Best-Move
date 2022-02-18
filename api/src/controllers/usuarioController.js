const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    crearUsuario: async (req, res) => {
        
        const {nombre, apellido, email, password, dni} = req.body;

        try{

            const salt = await bcryptjs.genSalt(10);
            newPassword = await bcryptjs.hash(password, salt);

            const usuario = await new Usuario({
                nombre,
                apellido,
                email,
                password: newPassword,
                dni
            })
            usuario.save();

            // genero 

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
    }
}
