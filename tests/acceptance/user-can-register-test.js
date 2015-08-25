import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'firebase-test/tests/helpers/start-app';

module('Acceptance | user can register', {
  beforeEach: function() {
    this.application = startApp();
  },
  afterEach: function() {
    if ( !(this.application.get('isDestroyed') || this.application.get('isDestroying')) ) {
      Ember.run(this.application, 'destroy');
    }
  }
});

test('visiting /register', function(assert) {
  visit('/register');
  
  andThen(function() {
    assert.equal(currentURL(), '/register');
  });
  // register user
  var randomNumber = Math.floor((Math.random() * 100000) + 1);
  fillIn('input[name="email"]','test'+randomNumber+'@qunit-firebase-test.com');
  fillIn('input[name="password"]','Outlook.1');
  fillIn('input[name="passwordConfirmation"]','Outlook.1');
  click('button[type="submit"]');
  
  andThen(function() {
    assert.ok(find('div .alert-success'));
  });
 
});
