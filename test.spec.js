'use strict';

// const chai = require('chai');
const contact = require('./index').handler;

describe('Send Contact Request', () => {

  it('Should create a quote', done => {

    const request = {
      message: 'This is a test contact us message',
      name: 'Test Blah',
      email: 'jj+testblah@getquorum.com'
    }

    contact(request, null, (err, data) => {
      done();
    });
  });
});
