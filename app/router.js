import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route('register' , { path: '/register' });
	this.route('login', { path: '/login' });
	this.route('reset', { path: '/reset' });
  this.resource('account',{ path: '/account' }, function(){
		this.route('password');
		this.route('manage');
		
  });
});

export default Router;
