var socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

// Evento definido por programador
socket.on('mensaje', (mensaje) => {
    console.log(` > Nuevo mensaje: ${mensaje.text}`);
});
