'use strict';

const eventEmitter = require('../eventPool.js');

// subscriber!
function logger(payload) {
  console.log("here at logger ", payload)
  console.log(
    `EVENT: { 
      event: '${payload.event}',
      time: '${Date.now()}',
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
