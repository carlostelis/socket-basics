var socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
});
