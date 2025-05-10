const express = require('express')
const app = express()

const http = require('http')
const server =  http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
    // referenciamos 'chat' que pusimos en el index.html
    socket.on('chat', (msg) => {
        console.log('mensaje: ' + msg)
        // emitimos el mensaje a todos los clientes conectados
        io.emit('chat', msg)
    })
})

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/cliente/index.html`)
})

server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000')
})