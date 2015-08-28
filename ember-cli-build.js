/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var funnel = require('ember-cli/node_modules/broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js');
  app.import(app.bowerDirectory + '/JavaScript-MD5/js/md5.js');
  var fontawesome = new funnel(app.bowerDirectory + '/font-awesome/fonts', {
    srcDir: '/',
    destDir: 'fonts'
  });
  var merged = mergeTrees([app.toTree(), fontawesome], {
     overwrite: true
  });

  return app.toTree(merged);f 
};
