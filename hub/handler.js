'use strict';

const eventEmitter = require('../eventPool.js');

// subscriber!
function handleHub(payload) {
  console.log(
    `EVENT: { 
      event: '${payload.event}',
      time: '${Date.now()}',
      payload: ${payload.data}
    }`
  )
}

module.exports = handleHub;
