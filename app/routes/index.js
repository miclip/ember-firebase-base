// app/routes/index.js
import Ember from 'ember';

export default Ember.Route.extend({
 model: function(){
 		var currentUser = this.get('session').get('currentUser');
 		if(!currentUser)	{
 				return null;
 		}
    var uid = currentUser.get('id');
	  return this.store.find('user',uid);
 },
 

});