const assert = require('assert');
const app = require('../../src/app');

describe('\'user-roles\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-roles');

    assert.ok(service, 'Registered the service');
  });
});
