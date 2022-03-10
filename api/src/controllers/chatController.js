const Chat = require('../models/chat');
const Usuario = require('../models/usuario');
const { socket } = require('../../socket');

module.exports = {
    añadirMensaje: async (req, res) => {

        let { userId2, text } = req.body;
        const userId1 = req.usuario.id;

        let mensajes;

        if(req.usuario.role === 'user'){

            let admin = await Usuario.findOne({role: 'admin'})

            userId2 = admin._id;

            mensajes = {
                from: userId1,
                to: admin._id,
                text,
                date: new Date
            }
        }
        if(req.usuario.role === 'admin'){

            mensajes = {
                from: userId1,
                to: userId2,
                text,
                date: new Date
            }
        }


        // De aqui saco el id del chat
        const juntarId = (id1, id2) => {
            var newId1 = id1.slice(0, Math.floor(id1.length / 2));

            var newId2 = id2.slice(0, Math.floor(id2.length / 2));

            if (newId1 < newId2) return newId1 + newId2;
            else return newId2 + newId1;
        }

        const idChat = juntarId(userId1.toString(), userId2.toString());

        try {

            let chat = await Chat.findById(idChat);
            if (!chat) {
                const users = [userId1, userId2]

                const newChat = await new Chat({
                    _id: idChat,
                    users,
                    mensajes
                });
                await newChat.save();

                let user = Usuario.findById(userId1);
                let user2 = Usuario.findById(userId2);
                const [usuario, usuario2] = await Promise.all([user, user2]);

                usuario.chats.length ? usuario.chats = [...usuario.chats, newChat._id] : usuario.chats = [newChat._id]
                await usuario.save();

                usuario2.chats.length ? usuario2.chats = [...usuario2.chats, newChat._id] : usuario2.chats = [newChat._id]
                await usuario2.save();

                return res.json({ msg: 'nuevo mensaje enviado' });
            }

            if (chat) {

                chat.mensajes = [...chat.mensajes, mensajes];
                chat.save();

                return res.json({ msg: 'mensaje enviado' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ msg: 'Hubo un error' })
        }
    },

    obtenerMensajes: async (req, res) => {

        try{

            const usuario = await Usuario.findById(req.usuario.id).populate({ path: 'chats' });

            const contactos = usuario.chats.map(e => e.users[0].toString() !== usuario._id.toString() ? e.users[0] : e.users[1]);

            const users = await Usuario.find({_id: contactos});
            
            
            const usuarios = users.map(e => {
                return {
                    _id: e._id,
                    nombre: e.nombre,
                    apellido: e.apellido
                }
            });
    
            res.json({usuarios, chats: usuario.chats});
        }
        catch(err){
            console.log(err);
            res.status(500).json({msg: 'Hubo un error'});
        }
    }
}