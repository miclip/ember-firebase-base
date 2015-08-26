// app/controllers/account.js
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
    'validationModel.password':{
    	presence: {message:"Password is required"},
    }
  },
firebase: Ember.inject.service(),
modelSuccess: false,
actions:{
 updateUser: function(model) {
 	this.setProperties({
 		modelSuccess: false,
 	});
 		var self = this;
	  let ref = self.get('firebase');
	  var password = model.get('password');
	  this.validate().then(function(){
	  	var changes = model.changedAttributes();
	  	
	  	if(changes && changes["email"] && changes["email"].length>0){
	  		var oldEmail = changes["email"][0]; 
	  		var newEmail = changes["email"][1]; 
	  		ref.changeEmail({oldEmail:oldEmail, newEmail:newEmail, password:password}, function(err) {
					if(!err){
						Ember.RSVP.Promise.resolve();
					    // save user and clear password
							model.set('password', null);
							model.set('passwordConfirmation', null);
							model.save();
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
					    model.set('email',oldEmail);

					}
      	});
	  	} else{
	  		// display name only changed
      	model.set('password', null);
				model.set('passwordConfirmation', null);
				model.save();
				self.set('modelSuccess', true);
	  	}
	  }).catch(function(err){
	  	model.get('errors').add('', 'Unexpected error:'+ err);
  		self.set('hasValidationErrors',true);
  	});
      
    }
	    }
});