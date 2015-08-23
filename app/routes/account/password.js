import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(){
		if(!this.get('session').get('isAuthenticated')){
			this.transitionTo('login');
		}
	},
	model: function(){
			var uid = this.get('session').get('currentUser').get('id');
	    var user =  this.store.find('user',uid);
	    console.log("email:"+user.get('email'));
	    return this.store.createRecord('change-password',{email:user.get('email')});
	},
});
