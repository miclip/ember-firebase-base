import AuthBase from '../authenticated-base';

export default AuthBase.extend({
	model: function(){
			var email = this.get('session').get('currentUser').get('email');
			return this.get('store').createRecord('change-password',{email:email});	
	},
	deactivate: function(){
			var model = this.get('controller.model');
			if(model.get('isNew')){
				model.deleteRecord();
			}
	},
});
