'use strict';

require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;
const io = require('socket.io-client');
const capsSocket = io.connect(SERVER_URL + '/caps');

function handlePickup(payload) {
  console.log('DRIVER: picked up ' + payload.orderId);
  capsSocket.emit('in-transit', payload);

  setTimeout(() => {
    console.log('DRIVER: delivered up ' + payload.orderId);
    capsSocket.emit('delivered', payload);
  }, 2000);
}

module.exports = handlePickup;
