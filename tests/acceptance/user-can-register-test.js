import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'firebase-test/tests/helpers/start-app';

module('Acceptance | user can register', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /register', function(assert) {
  visit('/register');
  
  andThen(function() {
    assert.equal(currentURL(), '/register');
  });
  
  fillIn('input[name="email"]','test4@someemail.com');
  fillIn('input[name="password"]','Outlook.1');
  fillIn('input[name="passwordConfirmation"]','Outlook.1');
  click('button[type="submit"]');
  
  andThen(function() {
    assert.expect(find('div .alert-success').length);
  });
 
});
