'use strict';

require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;
const io = require('socket.io-client');
const capsSocket = io.connect(SERVER_URL + '/caps');
const { createPickup, handleDelivery } = require('./handler.js');

capsSocket.emit('join', { clientId: '1-800-flowers' });
capsSocket.emit('notifyDelivered', { clientId: '1-800-flowers' });
capsSocket.emit('pickup', createPickup('1-800-flowers'));
capsSocket.on('deliveredLog', handleDelivery);
capsSocket.on('delivered', handleDelivery);
