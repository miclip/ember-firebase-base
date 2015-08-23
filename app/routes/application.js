// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.get("session").fetch().catch(function() {});
  },
  actions: {
	// global signout action  
    signOut: function() {
    	this.get('store').unloadAll('user');
      this.get("session").close();
      this.transitionTo('index');
    }
  }
});