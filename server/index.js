'use strict';

const { Server } = require('socket.io');

require('dotenv').config();
const PORT = process.env.PORT;

let server = new Server(PORT);

let capsServer = server.of('/caps');

function logger(type, payload){
  const event = {
    event: type,
    time: new Date(),
    payload,
  }
  console.log(`EVENT`, event);
}

capsServer.on('connection', (socket) => {
  console.log('Connection made to caps server!');

  socket.on('pickup', payload => {
    logger('pickup', payload);
    socket.broadcast.emit('pickup', payload);
  })

  socket.on('in-transit', (payload) => {
    logger('in-transit', payload);
    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logger('delivered', payload);
    socket.broadcast.emit('delivered', payload);
  });
})
