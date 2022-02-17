const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

conectarDB();

// habilitar cors
app.use(cors());

app.use(morgan('dev'));

// Habilitar express.json
app.use(express.json({extended: true}));

// importo las rutas
app.use('/api/usuarios', require('./src/routes/usuarios'));
app.use('/api/auth', require('./src/routes/auth'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});