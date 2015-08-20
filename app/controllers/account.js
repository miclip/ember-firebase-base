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
			alert('success');
			
		} else {
			Ember.RSVP.Promise.reject(err);
			alert(err);
		}
      });

		
    },
	 signIn: function() {
      this.get("session").open("firebase", { provider: "password", email:"", 
	  password:"", session: "sessionOnly"}).then(function(data) {
        console.log(data.currentUser);
      });
    }
}	
});