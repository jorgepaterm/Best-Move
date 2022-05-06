const {Schema, model} = require('mongoose');

const datoSchema = Schema({
    equipoUno: {
        type: String,
        required: true
    },
    equipoDos: {
        type: String,
        required: true
    },
    fechaHora: {
        type: String
    },
    resultado: {
        type: String,
        required: true
    },
    equipoUnoColor: {
        type: String,
        required: true
    },
    equipoDosColor: {
        type: String,
        required: true
    },
    championg: {
        type: String,
        required: true
    },
    liga: {
        type: String,
        required: true
    }
})

module.exports = model('dato', datoSchema)