import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(){
		if(!this.get('session').get('isAuthenticated')){
			this.transitionTo('login');
		}
	},
});
