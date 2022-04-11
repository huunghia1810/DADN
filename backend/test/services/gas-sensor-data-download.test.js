const assert = require('assert');
const app = require('../../src/app');

describe('\'gas-sensor-data-download\' service', () => {
  it('registered the service', () => {
    const service = app.service('gas-sensor-data-download');

    assert.ok(service, 'Registered the service');
  });
});
