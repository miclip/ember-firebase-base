import DS from 'ember-data';

export default DS.Model.extend({
 	email: DS.attr('string'),
  oldPassword: DS.attr('string'),
  newPassword: DS.attr('string'),
  newPasswordConfirmation: DS.attr('string'),
});
