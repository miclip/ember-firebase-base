import Ember from 'ember';

export default Ember.Component.extend({	
	actions: {
   		showErrors: function() {
   				this.set("showError", (this.get('errors').length>0));   			
   		}
 },
showSuccess:function(){ 
	return ( this.get('errors').length !=0 ||
		!((this.get('name').match('Confirmation'+"$")=='Confirmation') && this.get('value') == '') 
		&& this.get('errors').length ==0);
}.property('name','value','errors'),
onErrors: function () {	
   this.set("showError", (this.get('errors').length>0)); 
}.observes('hasValidationErrors'),
});