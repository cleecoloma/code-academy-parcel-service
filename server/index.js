'use strict';

const { Server } = require('socket.io');
const MessageQueue = require('./lib/queue.js');
require('dotenv').config();
const PORT = process.env.PORT;
let server = new Server(PORT);
let capsServer = server.of('/caps');
let pickUpQueue = new MessageQueue();
let deliveredQueue = new MessageQueue();

function logger(type, payload) {
  const event = {
    event: type,
    time: new Date(),
    payload,
  };
  console.log(`EVENT`, event);
}

function handlePickUp(payload) {
  let clientQueue = pickUpQueue.read(payload.clientId);
  if (!clientQueue) {
    let key = pickUpQueue.store(payload.clientId, new MessageQueue());
    clientQueue = pickUpQueue.read(key);
  }
  clientQueue.store(payload.messageId, payload);
  console.log(pickUpQueue.read(payload.clientId));
}

function handleDeliver(payload) {
  let clientQueue = deliveredQueue.read(payload.clientId);
  if (!clientQueue) {
    let key = deliveredQueue.store(payload.clientId, new MessageQueue());
    clientQueue = deliveredQueue.read(key);
  }
  clientQueue.store(payload.messageId, payload);
  console.log(deliveredQueue.read(payload.clientId));
}

capsServer.on('connection', (socket) => {
  console.log('Connection made to caps server!');

  socket.on('pickup', (payload) => {
    logger('pickup', payload);
    handlePickUp(payload);
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('needPickup', (payload) => {
    let queue = pickUpQueue.read(payload.clientId);
    if (queue) {
      let keys = Object.keys(queue.data);

      for (let i = 0; i < keys.length; i++) {
        let newPayload = queue.read(keys[i]);
        socket.emit('pickupLog', newPayload);
      }
    }
  });

  socket.on('notifyDelivered', (payload) => {
    let queue = deliveredQueue.read(payload.clientId);
    if (queue) {
      let keys = Object.keys(queue.data);

      for (let i = 0; i < keys.length; i++) {
        let newPayload = queue.read(keys[i]);
        socket.emit('deliveredLog', newPayload);
      }
    }
  });

  socket.on('received', (payload) => {
    let clientQueue;
    if (payload.event === 'delivered') {
      clientQueue = deliveredQueue.read(payload.clientId);
    } else if (payload.event === 'pickup') {
      clientQueue = pickUpQueue.read(payload.clientId);
    }
    if (clientQueue) {
      clientQueue.remove(payload.messageId);
    }
  });

  socket.on('in-transit', (payload) => {
    payload.event = 'in-transit';
    logger('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    payload.event = 'delivered';
    logger('delivered', payload);
    handleDeliver(payload);
    socket.broadcast.emit('delivered', payload);
  });

  socket.on('join', (payload) => {
    console.log('A SOCKET HAS JOINED THE ROOM: ', payload.clientId);
    socket.join(payload.clientId); //method for joining a room server side
    socket.broadcast.to(payload.clientId).emit('join', payload);
  });
});
