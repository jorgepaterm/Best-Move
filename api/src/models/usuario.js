const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    dni: {
        type: String,
        unique: true,
        trim: true
    },
    bloqueado: {
        type: String,
        default: 'true'
    },
    role: {
        type: String,
        default: 'user',
    },
    date: {
        type: Date,
        default: new Date
    },
    uuid: {
        type: String
    },
    chatsNoLeidos: Array,
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chat'
    }]
})

module.exports = mongoose.model('usuario', usuarioSchema)
