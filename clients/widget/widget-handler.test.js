'use strict';

// handler.test.js

const mockSocket = {
  emit: jest.fn(),
};

const { handleDelivery, createPickup } = require('./handler');

jest.mock('socket.io-client', () => {
  return {
    connect: () => mockSocket, // our mockSocket will be returned when the connect method is called.
  };
});

beforeEach(() => {
  // console.log = jest.fn(); ->
  jest.useFakeTimers(); // mocks timeout functionality
  jest.spyOn(console, 'log'); // keep our logger functionality, and spy on the invocation
});

describe('handleDelivery', () => {
  it('should log a thank you message with customer name', () => {
    const payload = { order : { customer: 'Alice' }};
    handleDelivery(payload);
    expect(console.log).toHaveBeenCalled();
  });
});

describe('createPickup', () => {
  it('should return an object with storeName, orderId, customer, and address', () => {
    const storeName = 'My Store';
    const pickup = createPickup(storeName);

    expect(pickup).toHaveProperty('clientId', storeName);
    expect(pickup).toHaveProperty('messageId');
    expect(pickup).toHaveProperty('event');
    expect(pickup).toHaveProperty('order');
  });
});
