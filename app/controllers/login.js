// app/controllers/account.js
import Ember from 'ember';

export default Ember.Controller.extend({
actions:{
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