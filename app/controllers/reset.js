import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations,{
hasValidationErrors: false,
validationModel: Ember.computed.alias('model'),
validations: {
    'validationModel.email': {
      presence: {message: " Email is required"},
      // validate using HTML5 accepted exceptions 
      format:{with:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  				message:" Email is not valid"}
    },    
  },
firebase: Ember.inject.service(),
resetSuccess:false,
isProcessing:false,
actions:{
 resetPassword: function(model) {
 	var self = this;
 	self.setProperties({
      resetSuccess: false,
      isProcessing: true,
    });
	  this.validate().then(function(){
	  	let ref = self.get('firebase');
	  	var email = model.get('email');
	  	console.log("email:"+email);
	  	
	  	ref.resetPassword({ email:email}, function(err) {
		  if(!err){
		  	Ember.RSVP.Promise.resolve();
			self.set("resetSuccess", true); 					
		  } else {
			Ember.RSVP.Promise.reject(err);
			self.set("resetSuccess", false);	
			switch (err.code) {
				case "INVALID_USER":
					model.get('errors').add('email', 'Email not found');
				break;
				default:
					model.get('errors').add('', 'Unexpected error:'+ err.message);
					console.log("Error creating user:", err.message);
			} 				
		  }
	    });
  	}).catch(function(err){
  		model.get('errors').add('', 'Unexpected error:'+ err);
		  	self.set('hasValidationErrors',true);
  	}).finally(function(){
  		self.set("isProcessing", false); 
  	});
   }
}


});
