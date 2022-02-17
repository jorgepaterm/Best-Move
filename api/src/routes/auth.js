const {Router} = require('express');
const {autenticarUsuario, usuarioAutenticado} = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = Router();

router.post('/',
    autenticarUsuario
)

router.get('/',
    auth,
    usuarioAutenticado
)

module.exports = router;
