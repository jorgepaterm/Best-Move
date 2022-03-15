const {Router} = require('express');
const {
    agregarDatos,
    eliminarDato,
    editarDato,
    obtenerDatos
} = require('../controllers/datoController');
const auth = require('../middleware/auth');

const router = Router();

router.post('/',
    auth,
    agregarDatos
);

router.delete('/:id',
    auth,
    eliminarDato
);

router.put('/:id',
    auth,
    editarDato
);

router.get('/',
    auth,
    obtenerDatos
)

module.exports = router;