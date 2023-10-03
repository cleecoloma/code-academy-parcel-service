'use strict';

const eventEmitter = require('../eventPool.js');

// subscriber!
function logger(payload) {
  console.log(
    `EVENT: { 
      event: '${payload.event}',
      time: '${new Date().toISOString()}',
      payload: {
        store: '${payload.data.store}',
        orderId: '${payload.data.orderId}',
        customer: '${payload.data.customer}',
        address: '${payload.data.address}'
      }
    }`
  )
}

module.exports = logger;
