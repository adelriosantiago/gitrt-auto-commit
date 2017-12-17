//GitRT auto commit tool

'use strict';

var fs = require('fs'),
  path = require('path'),
  nodegit = require("nodegit");

//Default options
var defaultOptions = { path: "./example-repso/", interval: 1000, author: {}, commiter: {}, message: "GitRT auto commit" };

function options(opts) {
  defaultOptions = _.merge(defaultOptions, opts);
}

var events = {
  open: function() {},
  error: function() {}
}

var actionFn = function() {};

var eventSetters = {
  action: function(myFn) {
    actionFn = myFn;
  }
}

function run() {
  nodegit.Repository.open(path.join(__dirname, defaultOptions.path)).then(function(repo) {
    var index, oid;
    
    console.log("Repository open", repo);
    
    var statusCheck = function() {
      setInterval(function() {
        console.log("c interval");
        
        repo.getStatus().then(function(status) {
          
          if (status.length <= 0) return;
          
          return repo.refreshIndex();
        }).then(function(_index) {
          index = _index;
          
          return index.addAll();
        }).then(function() {
          
          return index.write();
        }).then(function() {
          
          return index.writeTree();
        }).then(function(_oid) {
          oid = _oid;
          
          return nodegit.Reference.nameToId(repo, "HEAD");
        }).then(function(head) {
          
          return repo.getCommit(head);
        }).then(function(parent) {
          var author = nodegit.Signature.default(repo),
            committer = nodegit.Signature.now("GitRT", "GitRT");
            
          return repo.createCommit("HEAD", author, committer, defaultOptions.message, oid, [parent]);
        })
      }, defaultOptions.interval);
    }
    
    statusCheck();
  }).catch(function(err) {

    console.log("err", err);
    actionFn();
  });
  
  return eventSetters;
}

module.exports = {
  run: run
};