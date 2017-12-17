var autoCommit = require('./index.js');

autoCommit.run()
  .on('error', function() {
    console.log("Error opening repository, please check the 'path' setting");
  })
  .on('open', function() {
    console.log("Repository open, starting auto-commit");
  })
  .on('commit', function() {
    console.log("Change detected, commiting");
  })

