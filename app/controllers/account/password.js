// app/controllers/account/password.js
import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations,{
hasValidationErrors: false,
validationModel: Ember.computed.alias('model'),
validations: {
	'validationModel.oldPassword':{
      presence:{
        message: " Current password is required"
      }
	},
    'validationModel.newPassword':{
      presence:{
        message: " New password is required"
      },
      format:{with:/^(?=.*[A-Z])(?=.*[!.@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
      	message:" Password must be longer than 6, at least 1 digit, 1 special !.@#$&*, 1 upper & 1 lower case letter"
      },
    	confirmation: true,
	},
},
firebase: Ember.inject.service(),
modelSuccess: false,
actions:{
 updatePassword: function(model) {
 	this.setProperties({
 		modelSuccess: false,
 	});
 		var self = this;
	  let ref = self.get('firebase');
	  var email = model.get('email');
	  this.validate().then(function(){
	  		var oldPassword = model.get('oldPassword'); 
	  		var newPassword = model.get('newPassword'); 
	  		ref.changePassword({email:email, oldPassword:oldPassword, newPassword:newPassword}, function(err) {
					if(!err){
						Ember.RSVP.Promise.resolve();
						self.set('modelSuccess', true);
					} else {
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
      	});
	  	 
	  }).catch(function(err){
	  	model.get('errors').add('', 'Unexpected error:'+ err);
	  	self.set('hasValidationErrors',true);
  	}).finally(function(){
  		model.set('newPassword', null);
			model.set('newPasswordConfirmation', null);
			model.set('oldPassword', null);
  	});
      
    }
}
});