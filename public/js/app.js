var socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

// Evento definido por programador
socket.on('mensaje', (mensaje) => {
    console.log(` > Nuevo mensaje: ${mensaje.text}`);

    jQuery('.mensajes').append(`<p><strong>${moment.utc(mensaje.ts).local().format('h:mma')}:</strong> ${mensaje.text}</p>`);
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
        text: texto
    });
    $input_msg.val('');
});
