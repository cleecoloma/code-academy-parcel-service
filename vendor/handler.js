'use strict';

const eventEmitter = require('../eventPool.js');

// subscriber!
function handleVendor(payload) {

  eventEmitter.emit('pickup', { 
    store: 'Lawns',
    orderId: 'order123',
    customer: 'Koko',
    address: 'Bremerton, WA'
  });

  payload.delivered
    ? console.log(`Thank you for your order ${payload.customer}`)
    : null;
}

module.exports = handleVendor;
