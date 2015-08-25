// app/controllers/account.js
import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations,{
isProcessing:false,
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
	signIn: function(model) {
		var self = this;
 		self.setProperties({
    	isProcessing: true,
    });
	 	var email = model.get('email');
	  console.log("email:"+email);
	  var password = model.get('password');
	  self.validate().then(function(){
	  	self.get("session").open("firebase", { 
		  	provider: "password", 
		  	email:email, 
		  	password:password, 
		  	session: "sessionOnly"}).then(function() {
		  		model.destroyRecord();
		  		self.transitionTo("index");
    }).catch(function(err){
			switch (err.code) {
				case "INVALID_EMAIL":
					model.get('errors').add('email', 'User not found');
				break;
				case "INVALID_USER":
					model.get('errors').add('email', 'No such user');
				break;
				case "INVALID_PASSWORD":
					model.get('errors').add('password', 'Password is incorrect');
				break;
				default:
					model.get('errors').add('', 'Unexpected error:'+ err.code);
					console.log("Error creating user:", err);
			} 				

    });
		  }).catch(function(){
		  	alert('unepxected validation errors');
		  }).finally(function(){
    	self.set('isProcessing',false);
    });
	}
}	
});