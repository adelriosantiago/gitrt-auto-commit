//GitRT auto commit tool

'use strict';

var fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  nodegit = require("nodegit");

//Default settings
var settings = { path: ".", interval: 1000, author: {}, commiter: {}, message: "GitRT auto commit" };

var raiseEvent = {
  open: function() {},
  error: function() {}
}

var eventSetters = {
  on: function(event, myFn) {
    raiseEvent[event] = myFn;
    
    return this;
  }
}

function run(opts) {
  settings = _.merge(settings, opts);
  
  nodegit.Repository.open(path.join(__dirname, settings.path)).then(function(repo) {
    var index, oid;
    
    console.log("path", path.join(__dirname, settings.path));
    
    raiseEvent.open();
    
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
            
          return repo.createCommit("HEAD", author, committer, settings.message, oid, [parent]);
        })
      }, settings.interval);
    }
    
    statusCheck();
  }).catch(function(err) {

    console.log("err", err);
    raiseEvent.error();
  });
  
  return eventSetters;
}

module.exports = {
  run: run
};