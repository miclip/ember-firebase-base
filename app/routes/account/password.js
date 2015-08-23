import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(){
		if(!this.get('session').get('isAuthenticated')){
			this.transitionTo('login');
		}
	},
	model: function(){
			var uid = this.get('session').get('currentUser').get('id');
			var self = this;
			var user;
	    self.store.find('user',uid).then(function(user){
	    		console.log("email:"+user.email);
	    		user = self.get('store').createRecord('change-password',{email:user.get('email')});	
	    });
	    return user;
	},
});
