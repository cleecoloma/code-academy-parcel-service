'use strict';

const Chance = require('chance');
const chance = new Chance();
require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL;
const io = require('socket.io-client');
const capsSocket = io.connect(SERVER_URL + '/caps');

function handleDelivery(payload) {
  console.log('Thank you for your order ' + payload.order.customer);
  capsSocket.emit('received', payload);
}

function createPickup(storeName) {
  let orderId = chance.guid()
  return {
    event: 'pickup',
    messageId: orderId,
    clientId: storeName,
    order: {
      store: storeName,
      orderId,
      customer: chance.name(),
      address: chance.address(),
    }
  };
}

module.exports = {
  handleDelivery,
  createPickup,
};
