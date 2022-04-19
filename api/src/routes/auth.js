const {Router} = require('express');
const {autenticarUsuario, usuarioAutenticado, buscarUsuario} = require('../controllers/authController');
const auth = require('../middleware/auth');
const nodemailer = require('../nodeMailer/index');

const router = Router();

router.post('/',
    buscarUsuario,
    nodemailer,
    autenticarUsuario
)

router.get('/',
    auth,
    usuarioAutenticado
)

module.exports = router;
