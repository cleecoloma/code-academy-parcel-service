'use strict';

const eventEmitter = require('./eventPool,js');
const handleDriver = require('./driver');
const handleVendor = require('./vendor');

// listens to ALL events in the Event Pool
eventEmitter.on('driver', handleDriver);
eventEmitter.on('vendor', handleVendor);

// the order in which events are published, determines the order in which subscribers are run.
eventEmitter.emit('tired', { isTired: true });
eventEmitter.emit('temperature', {
  temperature: Math.floor(Math.random() * 100) + 1,
});