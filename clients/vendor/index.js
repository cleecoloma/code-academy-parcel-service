'use strict';

require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;
const io = require('socket.io-client');
const capsSocket = io.connect(SERVER_URL + '/caps');
const { createPickup, handleDelivery } = require('./handler.js');


capsSocket.emit('pickup', createPickup('1-206-flowers'));

capsSocket.on('delivered', handleDelivery);
