const Chat = require('../models/chat');
const Usuario = require('../models/usuario');
const { socket } = require('../../socket');

module.exports = {
    añadirMensaje: async (req, res) => {

        let { userId2, text } = req.body;
        const userId1 = req.usuario.id;
        
        let mensajes;

        let date = new Date().toLocaleString();
        
        if(req.usuario.role === 'user'){
            
            let admin = await Usuario.findOne({role: 'admin'})
            
            userId2 = admin._id;
            
            mensajes = {
                from: userId1,
                to: admin._id,
                text,
                date: date
            }
        }

        if(!userId2){
            return res.status(404).json({msg: 'Hubo un error'});
        }

        if(req.usuario.role === 'admin'){

            mensajes = {
                from: userId1,
                to: userId2,
                text,
                date: date
            }
        }


        // De aqui saco el id del chat
        const juntarId = (id1, id2) => {
            var newId1 = id1.slice(0, Math.floor(id1.length / 2));

            var newId2 = id2.slice(0, Math.floor(id2.length / 2));

            if (newId2 < newId1) return newId2 + newId1;
            else return newId1 + newId2;
        }

        const idChat = juntarId(userId1.toString(), userId2.toString());

        const visto = {
            [userId1]: null,
            [userId2]: idChat
        }

        try {
            let chat = await Chat.findOne({_id: idChat});
            if (!chat) {
                const users = [userId1, userId2]

                const newChat = await new Chat({
                    _id: idChat,
                    users,
                    mensajes,
                    visto
                });
                await newChat.save();

                let user = Usuario.findById(userId1);
                let user2 = Usuario.findById(userId2);
                const [usuario, usuario2] = await Promise.all([user, user2]);

                usuario.chats.length ? usuario.chats = [...usuario.chats, newChat._id] : usuario.chats = [newChat._id]
                await usuario.save();

                usuario2.chats.length ? usuario2.chats = [...usuario2.chats, newChat._id] : usuario2.chats = [newChat._id];
                usuario2.chatsNoLeidos = [...usuario2.chatsNoLeidos, newChat._id];

                await usuario2.save();

                socket.io.emit(`${userId2}:noti`, {});
                socket.io.emit(`${userId1}`, {idChat, chat, idUser2: userId1, mensajes});
                socket.io.emit(`${userId2}`, {idChat, chat, idUser2: userId1, mensajes, nuevoMensaje: true, nuevoContacto: true});

                return res.json({ msg: 'nuevo mensaje enviado' });
            }

            if (chat) {

                let nuevoMensaje = false;

                let usuario2 = await Usuario.findOne({_id: userId2});
                if(usuario2.chatsNoLeidos.includes(chat._id) == false){
                    console.log('no existe el chat');
                    usuario2.chatsNoLeidos = [...usuario2.chatsNoLeidos, chat._id];
                    await usuario2.save();
                    nuevoMensaje = true;
                }

                chat.mensajes = [...chat.mensajes, mensajes];
                chat.visto = visto;
                const newChat = await chat.save();

                socket.io.emit(`${userId2}:noti`, {});
                socket.io.emit(`${userId1}`, {idChat, chat, idUser2: userId1, mensajes, newChat});
                socket.io.emit(`${userId2}`, {idChat, chat, idUser2: userId1, mensajes, nuevoMensaje});
                

                return res.json({ msg: 'mensaje enviado' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ msg: 'Hubo un error' });
        }
    },

    obtenerMensajes: async (req, res) => {

        const {id} = req.params;
        const idUser = req.usuario.id;

        try{

            let usuarioFind = Usuario.findById(idUser)
            let chatFind = Chat.findById(id);

            const [chat, usuario] = await Promise.all([chatFind, usuarioFind])

            chat.visto[idUser] = null;
            await chat.save();

            usuario.chatsNoLeidos = usuario.chatsNoLeidos.filter(e => e.toString() !== id);
            await usuario.save();

            const userId2 = chat.users[0] !== req.usuario.id ? chat.users[0] : chat.users[1];

            res.json({chat, userId2, usuario});
        }
        catch(err){
            console.log(err);
            res.status(500).json({msg: 'Hubo un error'});
        }
    },

    obtenerContactos: async (req, res) => {

        try{

            const usuario = await Usuario.findById(req.usuario.id).populate({ path: 'chats' });

            const contactos = usuario.chats.map(e => e.users[0].toString() !== usuario._id.toString() ? e.users[0] : e.users[1]);

            const users = await Usuario.find({_id: contactos}).populate({ path: 'chats' });
            
            
            const usuarios = users.map(e => {
                return {
                    _id: e._id,
                    nombre: e.nombre,
                    apellido: e.apellido,
                    chats: e.chats
                }
            });

            res.json({usuarios, visto: usuario.visto});
        }
        catch(err){
            console.log(err);
            res.status(500).json({msg: 'Hubo un error'});
        }
    }
}