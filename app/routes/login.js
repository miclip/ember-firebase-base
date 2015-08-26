import Ember from 'ember';

export default Ember.Route.extend({
	
	model: function(){		

    return this.store.createRecord('user',{});
 },
 deactivate: function(){
			var model = this.get('controller.model');
			if(model.get('isNew')){
				model.deleteRecord();
			}
	},
	

});
