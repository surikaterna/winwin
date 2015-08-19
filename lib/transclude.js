var angular = require('angular');
var module = angular.module('ui.winwin');

module.directive('uiTransclude', ['$log', function ($log) {
    "use strict";
    return {
        "restrict": "A",
        "link": function (scope, element, attrs, nullCtrl, transcludeFn) {
            var elScope = element.scope();

            transcludeFn(elScope, function (clone) {
                element.append(clone);
            });
        }
    };
}]);