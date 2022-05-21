const assert = require('assert');
const app = require('../../src/app');

describe('\'gas-data\' service', () => {
  it('registered the service', () => {
    const service = app.service('gas-data');

    assert.ok(service, 'Registered the service');
  });
});
