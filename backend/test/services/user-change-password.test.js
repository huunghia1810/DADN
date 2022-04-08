const assert = require('assert');
const app = require('../../src/app');

describe('\'user-change-password\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-change-password');

    assert.ok(service, 'Registered the service');
  });
});
