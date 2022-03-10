const {Schema, model} = require('mongoose');

const chatSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'usuario'
        }
    ],
    mensajes: Array,
})

module.exports = model('chat', chatSchema)
