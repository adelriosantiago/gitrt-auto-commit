//TODO

var autoCommit = require('./index.js');

autoCommit.run()
  .on('error', function() {
    console.log("Error opening file");
  })
  .on('open', function() {
    console.log("Repo open");
  })
