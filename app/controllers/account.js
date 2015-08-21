// app/controllers/account.js
import Ember from 'ember';


export default Ember.Controller.extend({
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

		
    },
	 signIn: function(model) {
	 var email = model.get('email');
	  console.log("email:"+email);
	  var password = model.get('password');
	  
      this.get("session").open("firebase", { provider: "password", email:email, 
	  password:password, session: "sessionOnly"}).then(function(data) {
        console.log(data.currentUser);
      });
    }
}	
});