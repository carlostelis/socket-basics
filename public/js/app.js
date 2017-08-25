var socket = io();
var nombre = getQueryVariable('nombre') || 'Anónimo';
var room = getQueryVariable('room');

console.log(nombre +  ' entró a ' + room);

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

// Nombre de Evento definido por programador
socket.on('mensaje', (mensaje) => {
    console.log(` > Nuevo mensaje: ${mensaje.text}`);

    jQuery('.mensajes').append(`<p><strong>${mensaje.nombre} ${moment.utc(mensaje.ts).local().format('h:mma')}:</strong></p><p>${mensaje.text}</p>`);
});

var $form = jQuery("#form-mensaje");
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
