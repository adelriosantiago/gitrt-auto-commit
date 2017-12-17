//This test will auto-commit everything it founds in the repository at './example-repo'. A status check will we performed every 500ms

'use strict';

var autoCommit = require('./index.js');

autoCommit.run({ path: "example-repo", interval: 500 })
  .on('error', function() {
    console.log("Error opening repository, please check the 'path' setting");
  })
  .on('open', function() {
    console.log("Repository open, starting auto-commit");
  })
  .on('commit', function() {
    console.log("Change detected, commiting");
  })

