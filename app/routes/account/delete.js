import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(){
		if(!this.get('session').get('isAuthenticated')){
			this.transitionTo('login');
		}
	},
	model: function(){
			var uid = this.get('session').get('currentUser').get('id');
	    return this.store.find('user',uid);
	},
});