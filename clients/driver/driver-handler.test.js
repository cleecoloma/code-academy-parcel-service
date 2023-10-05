'use strict';

// handler.test.js

// Import the function you want to test
const handlePickup = require('./handler');

// Mock 'dotenv' to set environment variables for testing
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

// Mock 'socket.io-client' to avoid actual socket connections
jest.mock('socket.io-client', () => {
  const emitMock = jest.fn();
  return {
    connect: jest.fn(() => ({
      on: jest.fn(),
      emit: emitMock,
    })),
  };
});

// Mock console.log to capture log messages
const originalConsoleLog = console.log;
let consoleOutput;

// Utility function to wait for a certain period of time
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Test cases
describe('handlePickup', () => {
  beforeEach(() => {
    consoleOutput = []; // Clear the captured console output before each test
    console.log = (...args) => {
      consoleOutput.push(args.join(' '));
    };
  });

  it('should log "DRIVER: picked up [orderId]"', () => {
    const payload = { messageId: '123' };
    handlePickup(payload);
    expect(consoleOutput).toContain('DRIVER: picked up 123');
  });

  it('should log "DRIVER: delivered up [orderId]" after a delay', (done) => {
    const payload = { messageId: '123' };
    handlePickup(payload);

    // Wait for 2000 milliseconds (2 seconds) to simulate the delay
    setTimeout(() => {
      expect(consoleOutput).toContain('DRIVER: delivered up 123');
      done(); // Call done to signal the completion of the test
    }, 3000); // Adjust the timeout to match the actual delay
  });
});
