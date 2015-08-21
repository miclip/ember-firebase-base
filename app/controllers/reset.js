import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations,{
validations: {
    email: {
      presence: true,
      length: { maximum: 5 }
    },    
  },
firebase: Ember.inject.service(),
resetSuccess:false,
actions:{
 resetPassword: function(model) {
 	this.setProperties({
      resetSuccess: false
    });
	  

	  this.validate().then(function(){
		  let ref = this.get('firebase');
	 	  var email = model.get('email');
		  console.log("email:"+email);
		  var self = this;
	      ref.resetPassword({ email:email}, function(err) {
			if(!err){
				Ember.RSVP.Promise.resolve();
				self.set("resetSuccess", true); 
				
			} else {
				Ember.RSVP.Promise.reject(err);
				self.set("resetSuccess", false); 
			}
     	 });
  	}).catch(function(){
  		alert('failed');
  	});
   }
}


});
