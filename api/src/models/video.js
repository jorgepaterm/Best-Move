const {Schema, model} = require('mongoose');

const videoSchema = Schema({
    title: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    }
})

module.exports = model('video', videoSchema)
