const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(`${__dirname}/public`));

// No es para uso tradicional desde IP a IP
// Escucha conexiones desde front-end to back-end
// para transmisión de datos sin necesidad de refrescar
io.on('connection', (socket) => {
    console.log('User connected via socket.io');

    // Eventos definidos por programador
    socket.on('mensaje',(mensaje) => {
        console.log(`Mensaje recibido: ${mensaje.text}`);

        // A todos los clientes
        socket.broadcast.emit('mensaje', mensaje);
    });

    socket.emit('mensaje', {
        text: 'Bienvenido al chat'
    });
});

http.listen(PORT, () => {
    console.log('Server started');
});
