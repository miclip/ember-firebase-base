// app/controllers/account.js
import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations,{
validations: {
    email: {
      presence: {message: " Email is required"},
      // validate using HTML5 accepted exceptions 
      format:{with:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  				message:" Email is not valid"}
    },
    password:{
      presence:{
        message: " Password is required"
      },
      format:{with:/^(?=.*[A-Z])(?=.*[!.@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
      	message:" Password must be longer than 6, at least 1 digit, 1 special !.@#$&*, 1 upper & 1 lower case letter"
      },
    	confirmation: true,
    },
  },
firebase: Ember.inject.service(),
registerSuccess: false,
actions:{
 registerUser: function(model) {
 	this.setProperties({
 		registerSuccess: false,
 	});
 	var self = this;
	  let ref = self.get('firebase');
 	  var email = model.get('email');
	  console.log("email:"+email);
	  var password = model.get('password');
	  this.validate().then(function(){
	  	ref.createUser({ email:email,password:password, session:"sessionOnly"}, function(err, userData) {
			if(!err){
				Ember.RSVP.Promise.resolve();
				console.log("uid:"+userData.uid);
				  // save firebase id and clear password
					model.set('id', userData.uid);
					model.set('name',null);
					model.set('password', null);
					model.set('passwordConfirmation', null);
					model.save();
				self.set('registerSuccess', true);
			} else {
				Ember.RSVP.Promise.reject(err);
				switch (err.code) {
			      case "EMAIL_TAKEN":
			      	model.get('errors').add('email', 'Email is already in use.');
			        break;
			      case "INVALID_EMAIL":
			      	model.get('errors').add('email', 'Email is not valid.');
			        break;
			      default:
			      	model.get('errors').add('', 'Unexpected error:'+ err.message);
			        console.log("Error creating user:", err.message);
			    }
			}
      	});
	  }).catch(function(){
  		alert('Failed, validation errors exist');
  	});
      
    }
	    }
});