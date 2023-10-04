'use strict';

const Chance = require('chance');
const chance = new Chance();

function handleDelivery(payload) {
  console.log('Thank you for your order ' + payload.customer);
}

function createPickup(storeName) {
  let orderId = chance.guid()
  return {
    event: 'pickup',
    messageId: orderId,
    clientId: storeName,
    order: {
      store: storeName,
      orderId,
      customer: chance.name(),
      address: chance.address(),
    }
  };
}

module.exports = {
  handleDelivery,
  createPickup,
};
