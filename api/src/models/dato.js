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
    hora: {
        type: String
    },
    dia: {
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