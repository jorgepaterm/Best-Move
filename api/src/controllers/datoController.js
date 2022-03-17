const Dato = require('../models/dato');

module.exports = {
    agregarDatos: async (req, res) => {

        if(req.usuario.role !== 'admin'){
            return res.status(401).json({msg: 'Usuario no autorizado'});
        }

        const {equipoUno, equipoDos, fecha, hora, resultado} = req.body;

        const fechaHora = `F:${fecha} T:${hora}`;

        try{

            const dato = await new Dato({
                equipoUno,
                equipoDos,
                fechaHora,
                resultado
            })
            await dato.save();

            res.json({creado: true, msg: 'se creo correctamente', dato});
        }
        catch(err){
            console.log(err);
            res.status(400).json({creado: false, msg: 'Hubo un error'});
        }
    },

    eliminarDato: async (req, res) => {

        if(req.usuario.role !== 'admin'){
            return res.status(401).json({msg: 'Usuario no autorizado'});
        }

        const {id} = req.params;

        try{

            await Dato.findOneAndDelete({_id: id});

            res.json({eliminado: true, msg: 'Eliminado con exito', id});
        }
        catch(err){
            console.log(err);
            res.status(400).json({eliminado: false, msg: 'Hubo un error'});
        }

    },

    editarDato: async (req, res) => {

        if(req.usuario.role !== 'admin'){
            return res.status(401).json({msg: 'Usuario no autorizado'});
        }

        const {id} = req.params;
        const {equipoUno, equipoDos, fecha, hora, resultado} = req.body;

        let fechaHora;
        if(fecha && hora) {
            fechaHora = `F:${fecha} T:${hora}`;
        }

        try{

            const newDato = await Dato.findOneAndUpdate({_id: id}, {
                equipoUno,
                equipoDos,
                fechaHora,
                resultado
            },
            {
                new: true
            });

            

            res.json({editado: true, msg: 'Editado con exito', newDato});
        }
        catch(err){
            console.log(err);
            res.status(400).json({editado: false, msg: 'Hubo un error'});
        }
    },

    obtenerDatos: async (req, res) => {

        try{

            const datos = await Dato.find();

            res.json(datos);
        }
        catch(err){
            console.log(err);
            res.status(400).json({status: false, msg: 'Hubo un error'});
        }
    }
}
