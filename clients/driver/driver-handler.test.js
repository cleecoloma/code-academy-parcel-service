'use strict';

// handler.test.js

const mockSocket = {
  emit: jest.fn(),
};

// Import the function you want to test
const handlePickup = require('./handler');

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

// Test cases
describe('handlePickup', () => {
  it('should log "DRIVER: picked up [orderId]"', () => {
    const payload = { messageId: '123' };
    handlePickup(payload);
    expect(console.log).toHaveBeenCalled();
  });

  it('should log and socket.emit after a delay', () => {
    const payload = { messageId: '123' };
    jest.runAllTimers();
    handlePickup(payload);
    expect(console.log).toHaveBeenCalled();
    expect(mockSocket.emit).toHaveBeenCalled();
  });
});
