const assert = require('assert');
const app = require('../../src/app');

describe('\'gas-leak\' service', () => {
  it('registered the service', () => {
    const service = app.service('gas-leak');

    assert.ok(service, 'Registered the service');
  });
});
