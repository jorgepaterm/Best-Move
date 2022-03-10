const {Router} = require('express');
const {
    añadirMensaje,
    obtenerMensajes
} = require('../controllers/chatController');
const auth = require('../middleware/auth');

const router = Router();

router.post('/',
    auth,
    añadirMensaje
)

router.get('/',
    auth,
    obtenerMensajes
)

module.exports = router;
