import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(){
		if(!this.get('session').get('isAuthenticated')){
			this.transitionTo('login');
		}
	},
	model: function(){
			var email = this.get('session').get('currentUser').get('email');
			return this.get('store').createRecord('change-password',{email:email});	
	},
});
