'use strict';

require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;
const io = require('socket.io-client');
const capsSocket = io.connect(SERVER_URL + '/caps');
const handlePickup = require('./handler.js');

capsSocket.emit('get-pickup', ({ clientId: '1-800-flowers' }));
capsSocket.on('pickups', handlePickup);
// ({ clientId: 'client2' });