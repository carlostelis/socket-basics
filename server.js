const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(`${__dirname}/public`));

// esto escucha cuando se carga la página
io.on('connection', () => {
    console.log('User connected via socket.io');
});

http.listen(PORT, () => {
    console.log('Server started');
});
