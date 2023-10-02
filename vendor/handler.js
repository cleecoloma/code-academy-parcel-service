'use strict';

const eventEmitter = require('../eventPool.js');

const orderPayload = {
    store: 'Lawns',
    orderId: 'order123',
    customer: 'Koko',
    address: 'Bremerton, WA'
  };

function handleVendor(payload) {
  eventEmitter.emit('pickup', { event: 'pickup', data : orderPayload });

  eventEmitter.emit('driver', { data: orderPayload });
  // payload.start ? eventEmitter.emit('pickup', { event: 'pickup', data : {
  //   store: 'Lawns',
  //   orderId: 'order123',
  //   customer: 'Koko',
  //   address: 'Bremerton, WA'
  // }}) : null;
  // payload.delivered
  //   ? console.log(`Thank you for your order ${payload.customer}`)
  //   : null;
}

module.exports = handleVendor;
