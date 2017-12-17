# gitrt-auto-commit
GitRT auto commit tool

## Installation

`npm install --save gitrt-auto-commit`

## Usage

To auto-commit everything at './example-repo' every 500ms.

```javascript
var autoCommit = require('gitrt-auto-commit');

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
```
Will auto-commit only if changes are found. The folder must be a valid .git repository (i.e. "./example-repo/.git" must exist)

## License

GNU 3 © [@adelriosantiago](https://twitter.com/adelriosantiago)