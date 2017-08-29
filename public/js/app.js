var socket = io();
var nombre = getQueryVariable('nombre') || 'Anónimo';
var room = getQueryVariable('room') || 'General';

var $form = jQuery("#form-mensaje");
console.log(nombre +  ' entró a ' + room);

jQuery(".room-titulo").text('Room: ' + room);

socket.on('connect', () => {
    console.log('Conectado al servidor');
    // Custom event
    socket.emit('joinRoom', {
        nombre: nombre,
        room: room
    });
});

// Nombre de Evento definido por programador
socket.on('mensaje', (mensaje) => {
    console.log(` > Nuevo mensaje: ${mensaje.text}`);
    let $mensajes = jQuery('.mensajes');
    let $newMensaje = jQuery(`<li class="list-group-item"></li>`);

    $newMensaje.append(`<p><strong>${mensaje.nombre} ${moment.utc(mensaje.ts).local().format('h:mma')}:</strong></p><p>${mensaje.text}</p>`);
    $mensajes.append($newMensaje);
});


$form.on('submit', (event) => {
    event.preventDefault();

    let $input_msg = $form.find('input[name=mensaje]');
    let texto = $input_msg.val().trim();

    if (texto.length === 0) {
        return;
    }

    socket.emit('mensaje', {
        nombre: nombre,
        text: texto
    });
    $input_msg.val('');
});
