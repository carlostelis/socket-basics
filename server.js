const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');

app.use(express.static(`${__dirname}/public`));

let clientInfo = {};

function sendCurrentUsers(socket) {
    let info = clientInfo[socket.id];
    let users = [];

    if (typeof info === 'undefined') {
        console.log(info);
        return;
    }

    // Toma un objeto y devuelve un arreglo de los atributos
    // para recorrerlo con forEach
    Object.keys(clientInfo).forEach((socketId) => {
        let userInfo = clientInfo[socketId];

        if (userInfo.room === info.room) {
            console.log(userInfo.nombre);
            users.push(userInfo.nombre);
        }
    });

    // join() hace una cadena con el separador indicado
    socket.emit('mensaje', {
        nombre: 'Server NodeJS',
        text: `Usuarios: ${users.join(', ')}`,
        ts: moment().valueOf()
    });
}

// No es para uso tradicional desde IP a IP
// Escucha conexiones desde front-end to back-end
// para transmisión de datos sin necesidad de refrescar
io.on('connection', (socket) => {
    console.log('User connected via socket.io');

    socket.on('disconnect', () => {
        let datos = clientInfo[socket.id];
        if (typeof datos !== 'undefined') {
            socket.leave(datos);
            io.to(datos.room).emit('mensaje', {
                nombre: 'Server NodeJS',
                text: `${datos.nombre} ha abandonado el room`,
                ts: moment().valueOf()
            });

            delete clientInfo[socket.id];
        }
    });

    // Eventos definidos por programador
    socket.on('joinRoom', (req) => {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('mensaje', {
            nombre: 'Server NodeJS',
            text: req.nombre + " ha entrado al room...",
            ts: moment().valueOf()
        });
    });

    socket.on('mensaje',(mensaje) => {
        console.log(`Mensaje recibido: ${mensaje.text}`);

        if (mensaje.text === '@currentUsers') {
            sendCurrentUsers(socket);
        } else {
            // A todos los clientes
            io.to(clientInfo[socket.id].room).emit('mensaje', {
                ts: moment().valueOf(),
                text: mensaje.text,
                nombre: mensaje.nombre
            });
        }
    });

    socket.emit('mensaje', {
        ts: moment().valueOf(),
        text: 'Bienvenido al chat',
        nombre: 'Server NodeJS'
    });
});

http.listen(PORT, () => {
    console.log('Server started: ' + PORT);
});
