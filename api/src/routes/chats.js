const {Router} = require('express');
const {
    añadirMensaje,
    obtenerMensajes,
    obtenerContactos
} = require('../controllers/chatController');
const auth = require('../middleware/auth');

const router = Router();

router.post('/',
    auth,
    añadirMensaje
)

router.get('/:id',
    auth,
    obtenerMensajes
)

router.get('/',
    auth,
    obtenerContactos
)

module.exports = router;
