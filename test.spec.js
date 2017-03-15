'use strict';

const chai = require('chai');
const contact = require('./index').handler;
const _ = require('lodash');

describe('createContactRequest', () => {

  let req;

  beforeEach(done => {
    req = _.clone({
      type: 'quote',
      email: 'jj@powderkeglabs.com',
      message: {
        units: 200,
        name: 'JJ Hiew',
        phone: '123-432-1234',
        date: 'March 2016',
        business: ['general-elections', 'bylaw'],
        distribution: 'yes'
      }
    });
    done();
  });

  it('Should create a quote', done => {
    contact(req, null, (err, data) => {
      done();
    });
  });
});
