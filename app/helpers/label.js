import Ember from 'ember';

export function label(params, hash) {
  let parsedHtml = $('<label for="'+hash.for+'" class="'+hash.class+'" />').html(params[0])
  return new Ember.Handlebars.SafeString(parsedHtml[0].outerHTML);
};


export default Ember.Helper.helper(label);
