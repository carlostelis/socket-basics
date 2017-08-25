var socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

// Evento definido por programador
socket.on('mensaje', (mensaje) => {
    console.log(` > Nuevo mensaje: ${mensaje.text}`);

    jQuery('.mensajes').append(`<p>${mensaje.text}</p>`);
});

var $form = jQuery("#form-mensaje");
$form.on('submit', (event) => {
    event.preventDefault();

    var $input_msg = $form.find('input[name=mensaje]');
    socket.emit('mensaje', {
        text: $input_msg.val()
    });
    $input_msg.val('');
});
