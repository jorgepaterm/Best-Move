const {Router} = require('express');
const {
    crearUsuario,
    getUsers,
    blockUser,
    changePassword,
} = require('../controllers/usuarioController');
const enviarMail = require('../nodeMailer');
const auth = require('../middleware/auth');

const router = Router();

router.post('/',
    enviarMail,
    crearUsuario
)

router.get('/',
    auth,
    getUsers
)

router.put('/',
    auth,
    blockUser
)

router.put('/password-edit',
    auth,
    changePassword
)

module.exports = router;
