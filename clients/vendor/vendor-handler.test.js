'use strict';

const handleVendor = require('./handler.js');
const eventEmitter = require('../../eventPool.js');

// Mock the eventEmitter methods
jest.mock('../eventPool.js');

describe('handleVendor function', () => {
  it('should emit pickup and driver events with the correct payload', () => {
    const emitSpy = jest.spyOn(eventEmitter, 'emit');
    const orderPayload = {
      store: 'Lawns',
      orderId: 'order123',
      customer: 'Koko',
      address: 'Bremerton, WA',
    };

    handleVendor();

    expect(emitSpy).toHaveBeenCalledWith('pickup', {
      event: 'pickup',
      data: orderPayload,
    });
    expect(emitSpy).toHaveBeenCalledWith('driver', {
      data: orderPayload,
    });
  });

  it('should listen for deliveredVendor event', () => {
    const onSpy = jest.spyOn(eventEmitter, 'on');

    handleVendor();

    expect(onSpy).toHaveBeenCalledWith('deliveredVendor', expect.any(Function));
  });
});
