var angular = require('angular');
var module = angular.module('ui.winwin');

var PaneResolverService = function() {
  this._resolvers = [];
}

PaneResolverService.prototype.resolve = function(qry) {
  // console.log('resolve');
  // console.log(qry);
  for (var i = 0; i < this._resolvers.length; i++) {
    var res = this._resolvers[i](qry);
    if (res) return res;
  }
  return null;
}

PaneResolverService.prototype.addResolver = function(func) {
  this._resolvers.push(func);
}

var paneResolverService = new PaneResolverService();

module.factory('paneResolverService', function() {
  return paneResolverService;
});
