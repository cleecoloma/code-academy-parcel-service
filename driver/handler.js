'use strict';

const eventEmitter = require('../eventPool.js');

// subscriber!
function handleDriver(payload) {
  console.log(`DRIVER: picked up ${payload.data.orderId}`);

  eventEmitter.emit('in-transit', { event: 'in-transit', data: payload.data });

  console.log(`DRIVER: delivered up ${payload.data.orderId}`);

  // eventEmitter.emit('delivered', { event: 'pickup', data: orderPayload });

  // console.log(`DRIVER: delivered ${payload.order_id}`);

  // eventEmitter.emit('delivered', { isDelivered: true });
}

module.exports = handleDriver;
