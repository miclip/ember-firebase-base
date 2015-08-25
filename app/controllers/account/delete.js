// app/controllers/account.js
import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations,{
modelSuccess:false,
firebase: Ember.inject.service(),
validations: {
    email: {
      presence: {message: " Email is required"},
      // validate using HTML5 accepted exceptions 
      format:{with:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  				message:" Email is not valid"}
    },
    password:{
    	presence:{ message: " Password is required"}
    }    
},
actions:{
	removeUser: function(model) {
		var self = this;
		let ref = self.get('firebase');
 		self.setProperties({
		  modelSuccess: true,
		});
	 	var email = model.get('email');
		var password = model.get('password');
		self.validate().then(function(){
			
			ref.removeUser({email:email,password:password}, function(err) {
				if(!err){
					Ember.RSVP.Promise.resolve();
					self.set('modelSuccess', true);
					self.get('store').unloadAll('user');
					self.get("session").close();
				} else {
					// back out on error 
					model.set('isDeleted', false);
					model.set('deletedDate', null);
					model.save();
					Ember.RSVP.Promise.reject(err);
					switch (err.code) {
					  case "INVALID_PASSWORD":
						model.get('errors').add('password', 'Invalid password');
					    break;
					  case "INVALID_USER":
						model.get('errors').add('email', 'Could not find user');					      	
						break;
					  default:
						model.get('errors').add('', 'Unexpected error:'+ err.message);
						console.log("Error creating user:", err.message);
					}
					
				}
				return;
			});
			// set user as deleted 
			model.set('password', null);
			model.set('isDeleted', true);
			model.set('deletedDate', new Date());
			model.save().then(function(){
				console.log('record saved!');
				self.transition('login');
			});
			
		  }).catch(function(){
		  	alert('unepxected validation errors');
		  });
	}
}	
});