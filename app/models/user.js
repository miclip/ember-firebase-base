import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  deleted: DS.attr('boolean', {defaultValue:false}),
  deletedDate: DS.attr('date'),
  createdDate: DS.attr('date', {defaultValue:new Date()}),
  displayName: Ember.computed('name', 'email', function() {
  	var name = this.get('name');
    return (name != null) ? name : this.get('email');
  })
});
