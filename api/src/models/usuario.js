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
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user',
    },
    date: {
        type: Date,
        default: new Date
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chat'
    }]
})

module.exports = mongoose.model('usuario', usuarioSchema)
