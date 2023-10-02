'use strict';

const eventEmitter = require('./eventPool,js');
const handleDriver = require('./driver');
const handleVendor = require('./vendor');
const handleHub = require('./hub');

// listens to ALL events in the Event Pool
eventEmitter.on('driver', handleDriver);
eventEmitter.on('vendor', handleVendor);
eventEmitter.on('in-transit', handleHub);

// the order in which events are published, determines the order in which subscribers are run.
eventEmitter.emit('driver', { readyForPickup: true });
