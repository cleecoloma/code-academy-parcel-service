'use strict';

require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;
const io = require('socket.io-client');
const capsSocket = io.connect(SERVER_URL + '/caps');
const handlePickup = require('./handler.js');

capsSocket.emit('join', { clientId: '1-800-flowers' });
capsSocket.emit('join', { clientId: 'acme-widgets' });
capsSocket.emit('needPickup', ({ clientId: '1-800-flowers' }));
capsSocket.emit('needPickup', { clientId: 'acme-widgets' });
capsSocket.on('pickup', handlePickup);
capsSocket.on('pickupLog', handlePickup);
