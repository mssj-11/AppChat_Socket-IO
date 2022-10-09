// Configuracion del servidor

// Constante que tendra como valor un Require de Express
const express = require('express');
// Clase Express agregandolo a la constante app
const app = express();

// Agregando require con el paquete HTTP a la constante http
const http = require('http');
// Creacion del servidor
const server = http.createServer(app)

// Configuracion Socket.io(cliente)
const { Server } = require('socket.io');
const io = new Server(server);    // La constante sera = a una Instancia

// Sockets entrantes, evento connection
io.on('connection', (socket) => {
    //console.log('Un usuario se ha conectado');
    /*
    socket.on('chat', (msg) => {
        console.log('Mensaje: '+msg);   // Mostrando por consola los datos del cliente
    });*/
    socket.on('chat', (msg) => {
        io.emit('chat', msg);
    });
});


// Ruta raiz
app.get('/', (req, res) => {
    //res.send('<h1>Bienvenido al App-Chat</h1>');
    // Le agregamos la plantilla (${RAIZ}RUTA_PLANTILLA HTML)
    res.sendFile(`${__dirname}/cliente/index.html`);
});

// Accediendo al metodo listen de Express y como parametro agregamos el puerto
server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});