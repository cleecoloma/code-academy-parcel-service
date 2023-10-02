'use strict';

const eventEmitter = require('../eventPool.js');

const orderPayload = {
  store: 'Lawns',
  orderId: 'order123',
  customer: 'Koko',
  address: 'Bremerton, WA',
};

function handleVendor(payload) {
  console.log(`Im here at vendor `, payload);
  if (payload === 'delivered') {
    console.log(`Thank you for delivering ${orderPayload.orderId}`);
  } else {
    eventEmitter.emit('pickup', { event: 'pickup', data: orderPayload });

    eventEmitter.emit('driver', { data: orderPayload });
  }

}

module.exports = handleVendor;
