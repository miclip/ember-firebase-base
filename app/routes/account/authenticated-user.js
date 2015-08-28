import AuthBase from '../authenticated-base';

export default AuthBase.extend({
	model: function(){
		 var uid = this.get('session').get('currentUser').get('id');
	    return this.store.find('user',uid);
	},
});