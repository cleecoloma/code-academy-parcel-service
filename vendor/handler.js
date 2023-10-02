'use strict';

const eventEmitter = require('../eventPool.js');

const orderPayload = {
  store: 'Lawns',
  orderId: 'order123',
  customer: 'Koko',
  address: 'Bremerton, WA',
};

function handleVendor(payload) {
  eventEmitter.emit('pickup', { event: 'pickup', data: orderPayload });

  eventEmitter.emit('driver', { data: orderPayload });

  eventEmitter.on('deliveredVendor', () => {
    console.log(`Thank you for delivering ${orderPayload.orderId}`);
  });
}

module.exports = handleVendor;
