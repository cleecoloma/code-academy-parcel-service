'use strict';

require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;
const io = require('socket.io-client');
const capsSocket = io.connect(SERVER_URL + '/caps');
const { createPickup, handleDelivery } = require('./handler.js');

capsSocket.emit('join', { clientId: 'acme-widgets' });
capsSocket.emit('notifyDelivered', { clientId: 'acme-widgets' });
capsSocket.emit('pickup', createPickup('acme-widgets'));
capsSocket.on('deliveredLog', handleDelivery);
capsSocket.on('delivered', handleDelivery);
