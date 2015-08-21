// app/controllers/account.js
import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations,{
	validations: {
    email: {
      presence: true,
      length: { maximum: 5 }
    },    
    password:{
    	confirmation: true
    	
    	
    },
    passwordConfirmation: {
  		
  	}
  },
firebase: Ember.inject.service(),
actions:{
 registerUser: function(model) {
	   let ref = this.get('firebase');
 	  var email = model.get('email');
	  console.log("email:"+email);
	  var password = model.get('password');
	  
      ref.createUser({ email:email,password:password, session:"sessionOnly"}, function(err) {
		if(!err){
			Ember.RSVP.Promise.resolve();
			
			
		} else {
			Ember.RSVP.Promise.reject(err);
			
		}
      });
    }
	    }
});