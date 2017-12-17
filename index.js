//GitRT auto commit tool

'use strict';

var fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  nodegit = require("nodegit");

//Default settings
var settings = { path: "./repo", interval: 1000, message: "GitRT auto commit" };

var raiseEvent = {
  open: function() {},
  commit: function() {},
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
    
    raiseEvent.open();
    
    var statusCheck = function() {
      setInterval(function() {
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
            
            raiseEvent.commit();
            
          return repo.createCommit("HEAD", author, committer, settings.message, oid, [parent]);
        })
      }, settings.interval);
    }
    
    statusCheck();
  }).catch(function(err) {
    raiseEvent.error();
  });
  
  return eventSetters;
}

module.exports = {
  run: run
};