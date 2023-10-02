'use strict';

const eventEmitter = require('../eventPool.js');

// subscriber!
function handleDriver(payload) {
  payload.readyForPickup ? console.log(`DRIVER: picked up ${payload.order_id}`) : null;

  // eventEmitter.on('pickup', handleDriver);

  eventEmitter.emit('in-transit', { isInTransit: true });

  console.log(`DRIVER: delivered ${payload.order_id}`);

  eventEmitter.emit('delivered', { isDelivered: true });
}

module.exports = handleDriver;
