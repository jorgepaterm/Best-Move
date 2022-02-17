const {Router} = require('express');
const {
    crearUsuario
} = require('../controllers/usuarioController');

const router = Router();

router.post('/',
    crearUsuario
)

module.exports = router;
