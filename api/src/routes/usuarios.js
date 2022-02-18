const {Router} = require('express');
const {
    crearUsuario
} = require('../controllers/usuarioController');
const enviarMail = require('../nodeMailer');

const router = Router();

router.post('/',
    enviarMail,
    crearUsuario
)

module.exports = router;
