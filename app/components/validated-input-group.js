import Ember from 'ember';

export default Ember.Component.extend({	

	actions: {
   		showErrors: function() {
   				this.set("showError", this.get('hasErrors'));  
   				this.set("showSuccess", this.get('hasSuccess'));  			
   		}
 },
hasErrors:function(){
 return	this.get('errors') != null && this.get('errors').length>0;
}.property('errors'),
hasSuccess:function(){ 
	return ( !this.get('hasErrors') ||
		(!((this.get('name').match('Confirmation'+"$")==='Confirmation') && this.get('value') === '') && this.get('hasErrors')));
}.property('name','value','errors'),
onErrors: function () {	
  	this.set("showError", this.get('hasErrors'));  
   				this.set("showSuccess", this.get('hasSuccess')); 
}.observes('hasValidationErrors'),


});