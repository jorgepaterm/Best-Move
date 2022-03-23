const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const socket = require('./socket');

const app = express();

const server = require('http').createServer(app);
socket.connect(server);

conectarDB();

// habilitar cors
app.use(cors());

app.use(morgan('dev'));

// Habilitar express.json
app.use(express.json({extended: true}));

// importo las rutas
app.use('/api/usuarios', require('./src/routes/usuarios'));
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/chat', require('./src/routes/chats'));
app.use('/api/dato', require('./src/routes/datos'));
app.use('/api/videos', require('./src/routes/videos'));

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});