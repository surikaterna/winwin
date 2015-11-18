var angular = require('angular');
var module = angular.module('ui.winwin');

var paneId = 0;

module.directive('pane', [ function() {
  return {
    restrict: 'E',
    require: '^window',
    replace: true,
    transclude: true,
    scope: {
      caption: '@',
      active: '=?',
      onSelect: '&select',
      onDeselect: '&deselect'
    },
    template: '<div id="{{id}}" \
      ng-class="{active: active}" \
      class="tab" \
      ui-draggable \
      ui-drag-format="application/x-lx-window-pane" \
      ui-drag-data=\'{\"id\":\"{{id}}\"}\' \
      ng-click="select()"> \
        <span pane-caption-transclude>{{caption}}</span> \
    </div>',
    controller: function() {},
    compile: function(element, attrs, transclude) {
      return function postLink(scope, element, attr, windowCtrl) {
        scope.id = 'wnd-pane' + paneId++;
        scope.active = false;
        windowCtrl.addPane(scope);
        scope.$watch('active', function(active) {
          if (active) { windowCtrl.select(scope); }
        });
        scope.select = function() {
          scope.active = true;
          // windowCtrl.select(scope);
        }
        scope.remove = function() {
          windowCtrl.removePane(scope);
        }
        element.on('$destroy', function() {
          console.log('Pane Destroy');
          scope.remove();
          scope.$destroy();
        });
        scope.$transcludeFn = transclude;
      }
    }
  };
}]);


module.directive('paneCaptionTransclude', [ function() {
  return {
    restrict: 'A',
    require: '^pane',
    link: function(scope, elm, attrs, tabCtrl) {
      scope.$watch('captionElement', function updateHeadingElement(caption) {
        if (caption) {
          elm.html('');
          elm.append(caption);
        }
      });
    }
  };
}]);

module.directive('paneContentTransclude', [ function() {
  var isPaneCaption = function(node) {
    return node.tagName && (
      node.hasAttribute('pane-caption') ||
      node.hasAttribute('data-pane-caption') ||
      node.tagName.toLowerCase() === 'pane-caption' ||
      node.tagName.toLowerCase() === 'data-pane-caption'
    );
  }

  return {
    restrict: 'A',
    require: '^window',
    link: function(scope, elm, attrs) {
      var pane = scope.$eval(attrs.paneContentTransclude);
      scope.id = pane.id;

      // Now our tab is ready to be transcluded: both the tab heading area
      // and the tab content area are loaded.  Transclude 'em both.
      pane.$transcludeFn(pane.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isPaneCaption(node)) {
            // Let tabHeadingTransclude know.
            pane.captionElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };
}]);
