'use strict';

const handleDriver = require('./handler.js');

beforeEach(() => {
  console.log = jest.fn();
});

describe('Testing driver handler', () => {
  test('Should log when driver picks up payload', () => {
    handleDriver({
      data: {
        store: 'Lawns',
        orderId: 'order123',
        customer: 'Koko',
        address: 'Bremerton, WA',
      },
    });
    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up order123');
  });

  test('Should log when driver delivers payload', () => {
    handleDriver({
      data: {
        store: 'Lawns',
        orderId: 'order123',
        customer: 'Koko',
        address: 'Bremerton, WA',
      },
    });
    expect(console.log).toHaveBeenCalledWith('DRIVER: delivered up order123');
  });
});
