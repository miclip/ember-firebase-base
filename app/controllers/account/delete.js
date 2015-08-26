// app/controllers/account.js
import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations,{
hasValidationErrors: false,
validationModel: Ember.computed.alias('model'),
modelSuccess:false,
firebase: Ember.inject.service(),
validations: {
    'validationModel.email': {
      presence: {message: " Email is required"},
      // validate using HTML5 accepted exceptions 
      format:{with:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  				message:" Email is not valid"}
    },
    'validationModel.password':{
    	presence:{ message: " Password is required"}
    }    
},
actions:{
	removeUser: function(model) {
		var self = this;
		let ref = self.get('firebase');
 		self.setProperties({
		  modelSuccess: false,
		});
	 	var email = model.get('email');
		var password = model.get('password');
		self.validate().then(function(){
			
			ref.removeUser({email:email,password:password}, function(err) {
				if(!err){
					Ember.RSVP.Promise.resolve();
				} else {
					model.set('modelSuccess', false);
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
			model.set('deleted', true);
			model.set('deletedDate', new Date());
			model.save().then(function(){
					  model.unloadRecord();
					  self.get("session").close();
					  self.transitionTo('index');
			});	
			
		  }).catch(function(){
		  	self.set('hasValidationErrors',true);
		  });
	}
}	
});