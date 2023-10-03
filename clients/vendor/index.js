'use strict';

require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;
const io = require('socket.io-client');
const capsSocket = io.connect(SERVER_URL + '/caps');
const { createPickup, handleDelivery } = require('./handler.js');

// capsSocket.emit('pickup', createPickup('1-206-flowers'));

let intervalCount = 0;
const maxIntervals = 5; // Number of intervals you want to run

// Define the function to emit 'pickup' event
function emitPickupEvent() {
  capsSocket.emit('pickup', createPickup('1-206-flowers'));
  intervalCount++;

  if (intervalCount === maxIntervals) {
    clearInterval(intervalId); // Stop the setInterval after 5 intervals
  }
}

// Start the setInterval
const intervalId = setInterval(emitPickupEvent, 5000); // 5000 milliseconds = 5 seconds

capsSocket.on('delivered', handleDelivery);
