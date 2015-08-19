var angular = require('angular');
var module = angular.module('ui.winwin');

var paneId = 0;

module.directive('pane', function () {
      return {
		restrict: 'E',
		require:'^window',
		replace: true,
		transclude: true,
		scope: {
			caption: '@',
			active: '=?',
			onSelect: '&select',
			onDeselect: '&deselect'
		},
		//template: '<div id="{{id}}" class="pane" draggable="true" ng-show="active"><div ng-transclude></div></div>',
		template: '<div id="{{id}}" ng-class="{active: active}"><a href draggable="true" ng-click="select()" pane-caption-transclude>{{caption}}</a></div>',
		controller: function($scope) {
		},
/*		compile: function(element, attr, transclusion) {
			return 
		},*/
		compile: function(element, attrs, transclude) {

			return function postLink(scope, element, attr, windowCtrl) {
				scope.id = 'wnd-pane' + paneId++;
				console.log('Creating pane ' + scope.id + " || " + scope.caption);
				console.log(scope);
				scope.active = false;
				windowCtrl.addPane(scope);
				scope.$watch('active', function(active) {
	          		if (active) {
			            windowCtrl.select(scope);
	    	    	}
	       		});
	       		scope.select = function() {
	       			console.log("Selected " + scope.caption);
	       			console.log(windowCtrl);
	       			scope.active = true;
	//       			windowCtrl.select(scope);
	       		}
	       		scope.remove = function() {
	       			console.log("Removing " + scope.caption);
					windowCtrl.removePane(scope);
	       		}
	       		scope.$on('$destroy', function() {
					console.log('destroying scope: ' + scope.id);
	       		});

				element.on('$destroy', function() {
					console.log('destroying element: ' + scope.id);
					console.log('destroying element: ' + element);
					scope.remove();
					scope.$destroy();
				});
				element.bind('dragstart', function() {
					console.log('dragstart');
					//event.dataTransfer.setData('application/x-lx-window-pane', JSON.stringify({pane: scope.id, browserWindow:'master'}));
					event.dataTransfer.setData('application/x-lx-window-pane', scope.id);
				});
				scope.$transcludeFn = transclude;			
			}
		}
      };
  });

module.directive('paneCaptionTransclude', function() {
  return {
    restrict: 'A',
    require: '^pane',
    link: function(scope, elm, attrs, tabCtrl) {
    	console.log("**** LINK ****");
      scope.$watch('captionElement', function updateHeadingElement(caption) {
        if (caption) {
          elm.html('');
          elm.append(caption);
        }
      });
    }
  };
});

module.directive('paneContentTransclude', function() {
  return {
    restrict: 'A',
    require: '^window',
    link: function(scope, elm, attrs) {
      console.log('content transclude');
      console.log('pane');
      console.log(attrs.paneContentTransclude);
      var pane = scope.$eval(attrs.paneContentTransclude);
      console.log(pane);
      scope.id = pane.id;
      //elm.id = pane.id + "-content";

      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      pane.$transcludeFn(pane.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isPaneCaption(node)) {
            //Let tabHeadingTransclude know.
            pane.captionElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };
  function isPaneCaption(node) {
    return node.tagName &&  (
      node.hasAttribute('pane-caption') ||
      node.hasAttribute('data-pane-caption') ||
      node.tagName.toLowerCase() === 'pane-caption' ||
      node.tagName.toLowerCase() === 'data-pane-caption'
    );
  }
});