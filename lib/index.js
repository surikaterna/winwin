var angular = require('angular');
require('dragged');
require('splitbox');

angular.module('ui.winwin', ['ui.dragged', 'ui.box']);

require('./transclude');
require('./window');
require('./pane');
require('./services/pane-service');
