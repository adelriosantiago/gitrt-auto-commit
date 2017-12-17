//TODO

var autoCommit = require('./index.js');

autoCommit.run({ path: "example-repo" })
  .on('error', function() {
    console.log("Error opening file");
  })
  .on('open', function() {
    console.log("Repo open");
  })
