//TODO

var autoCommit = require('./index.js');

autoCommit.run()
  .action(function() {
    console.log("our action");
  });
