import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
   		showErrors: function() {
   			this.set("showError", (this.get('errors').length>0));
   		}
 }
});