'use strict';

require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;
const io = require('socket.io-client');
const capsSocket = io.connect(SERVER_URL + '/caps');
const { createPickup, handleDelivery } = require('./handler.js');

// let intervalCount = 0;
// const maxIntervals = 5; // Number of intervals you want to run

// // Define the function to emit 'pickup' event
// function emitPickupEvent() {
//   capsSocket.emit('pickup', createPickup('1-206-flowers'));
//   intervalCount++;

//   // Stop the setInterval after 5 intervals
//   if (intervalCount === maxIntervals) {
//     clearInterval(intervalId);
//   }
// }

// // Start the setInterval - 5000 milliseconds = 5 seconds
// const intervalId = setInterval(emitPickupEvent, 5000);

capsSocket.emit('pickup', createPickup('1-800-flowers'));

capsSocket.emit('join', { store: '1-800-flowers' });
capsSocket.on('delivered', handleDelivery);
