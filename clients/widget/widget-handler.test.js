'use strict';

// handler.test.js

const { handleDelivery, createPickup } = require('./handler');

// Mock console.log to capture log messages
const originalConsoleLog = console.log;
let consoleOutput;

beforeEach(() => {
  consoleOutput = []; // Clear the captured console output before each test
  console.log = (...args) => {
    consoleOutput.push(args.join(' '));
  };
});

afterEach(() => {
  console.log = originalConsoleLog; // Restore the original console.log after each test
});

describe('handleDelivery', () => {
  it('should log a thank you message with customer name', () => {
    const payload = { order : { customer: 'Alice' }};
    handleDelivery(payload);
    expect(consoleOutput).toContain('Thank you for your order Alice');
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
