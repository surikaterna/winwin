(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./lib');
},{"./lib":2}],2:[function(require,module,exports){
var module = angular.module('ui.winwin', []);
require('./transclude');
require('./window');
require('./pane');
},{"./pane":3,"./transclude":4,"./window":5}],3:[function(require,module,exports){
(function (global){
var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);
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
		template: '<div id="{{id}}" ng-class="{active: active}"><a href draggable="true" ng-click="select()" pane-caption-transclude>{{caption}}</a></div>',
		controller: function($scope) {
		},
		compile: function(element, attrs, transclude) {

			return function postLink(scope, element, attr, windowCtrl) {
				scope.id = 'wnd-pane' + paneId++;
				scope.active = false;
				windowCtrl.addPane(scope);
				scope.$watch('active', function(active) {
	          		if (active) {
			            windowCtrl.select(scope);
	    	    	}
	       		});
	       		scope.select = function() {
	       			scope.active = true;
	//       			windowCtrl.select(scope);
	       		}
	       		scope.remove = function() {
					windowCtrl.removePane(scope);
	       		}

				element.on('$destroy', function() {
					scope.remove();
					scope.$destroy();
				});
				element.bind('dragstart', function(event) {
					event.originalEvent.dataTransfer.setData('application/x-lx-window-pane', scope.id);
  					event.originalEvent.dataTransfer.setData('Text', 'gosu');
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
      var pane = scope.$eval(attrs.paneContentTransclude);
      scope.id = pane.id;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9wYW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snYW5ndWxhciddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnYW5ndWxhciddIDogbnVsbCk7XHJcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgndWkud2lud2luJyk7XHJcblxyXG52YXIgcGFuZUlkID0gMDtcclxuXHJcbm1vZHVsZS5kaXJlY3RpdmUoJ3BhbmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcblx0XHRyZXN0cmljdDogJ0UnLFxyXG5cdFx0cmVxdWlyZTonXndpbmRvdycsXHJcblx0XHRyZXBsYWNlOiB0cnVlLFxyXG5cdFx0dHJhbnNjbHVkZTogdHJ1ZSxcclxuXHRcdHNjb3BlOiB7XHJcblx0XHRcdGNhcHRpb246ICdAJyxcclxuXHRcdFx0YWN0aXZlOiAnPT8nLFxyXG5cdFx0XHRvblNlbGVjdDogJyZzZWxlY3QnLFxyXG5cdFx0XHRvbkRlc2VsZWN0OiAnJmRlc2VsZWN0J1xyXG5cdFx0fSxcclxuXHRcdHRlbXBsYXRlOiAnPGRpdiBpZD1cInt7aWR9fVwiIG5nLWNsYXNzPVwie2FjdGl2ZTogYWN0aXZlfVwiPjxhIGhyZWYgZHJhZ2dhYmxlPVwidHJ1ZVwiIG5nLWNsaWNrPVwic2VsZWN0KClcIiBwYW5lLWNhcHRpb24tdHJhbnNjbHVkZT57e2NhcHRpb259fTwvYT48L2Rpdj4nLFxyXG5cdFx0Y29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XHJcblx0XHR9LFxyXG5cdFx0Y29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMsIHRyYW5zY2x1ZGUpIHtcclxuXHJcblx0XHRcdHJldHVybiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0ciwgd2luZG93Q3RybCkge1xyXG5cdFx0XHRcdHNjb3BlLmlkID0gJ3duZC1wYW5lJyArIHBhbmVJZCsrO1xyXG5cdFx0XHRcdHNjb3BlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdHdpbmRvd0N0cmwuYWRkUGFuZShzY29wZSk7XHJcblx0XHRcdFx0c2NvcGUuJHdhdGNoKCdhY3RpdmUnLCBmdW5jdGlvbihhY3RpdmUpIHtcclxuXHQgICAgICAgICAgXHRcdGlmIChhY3RpdmUpIHtcclxuXHRcdFx0ICAgICAgICAgICAgd2luZG93Q3RybC5zZWxlY3Qoc2NvcGUpO1xyXG5cdCAgICBcdCAgICBcdH1cclxuXHQgICAgICAgXHRcdH0pO1xyXG5cdCAgICAgICBcdFx0c2NvcGUuc2VsZWN0ID0gZnVuY3Rpb24oKSB7XHJcblx0ICAgICAgIFx0XHRcdHNjb3BlLmFjdGl2ZSA9IHRydWU7XHJcblx0Ly8gICAgICAgXHRcdFx0d2luZG93Q3RybC5zZWxlY3Qoc2NvcGUpO1xyXG5cdCAgICAgICBcdFx0fVxyXG5cdCAgICAgICBcdFx0c2NvcGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR3aW5kb3dDdHJsLnJlbW92ZVBhbmUoc2NvcGUpO1xyXG5cdCAgICAgICBcdFx0fVxyXG5cclxuXHRcdFx0XHRlbGVtZW50Lm9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c2NvcGUucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRzY29wZS4kZGVzdHJveSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGVsZW1lbnQuYmluZCgnZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ2FwcGxpY2F0aW9uL3gtbHgtd2luZG93LXBhbmUnLCBzY29wZS5pZCk7XHJcbiAgXHRcdFx0XHRcdGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ1RleHQnLCAnZ29zdScpO1xyXG4gIFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0c2NvcGUuJHRyYW5zY2x1ZGVGbiA9IHRyYW5zY2x1ZGU7XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgICAgfTtcclxuICB9KTtcclxuXHJcbm1vZHVsZS5kaXJlY3RpdmUoJ3BhbmVDYXB0aW9uVHJhbnNjbHVkZScsIGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgcmVxdWlyZTogJ15wYW5lJyxcclxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbG0sIGF0dHJzLCB0YWJDdHJsKSB7XHJcbiAgICAgIHNjb3BlLiR3YXRjaCgnY2FwdGlvbkVsZW1lbnQnLCBmdW5jdGlvbiB1cGRhdGVIZWFkaW5nRWxlbWVudChjYXB0aW9uKSB7XHJcbiAgICAgICAgaWYgKGNhcHRpb24pIHtcclxuICAgICAgICAgIGVsbS5odG1sKCcnKTtcclxuICAgICAgICAgIGVsbS5hcHBlbmQoY2FwdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59KTtcclxuXHJcbm1vZHVsZS5kaXJlY3RpdmUoJ3BhbmVDb250ZW50VHJhbnNjbHVkZScsIGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgcmVxdWlyZTogJ153aW5kb3cnLFxyXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsbSwgYXR0cnMpIHtcclxuICAgICAgdmFyIHBhbmUgPSBzY29wZS4kZXZhbChhdHRycy5wYW5lQ29udGVudFRyYW5zY2x1ZGUpO1xyXG4gICAgICBzY29wZS5pZCA9IHBhbmUuaWQ7XHJcblxyXG4gICAgICAvL05vdyBvdXIgdGFiIGlzIHJlYWR5IHRvIGJlIHRyYW5zY2x1ZGVkOiBib3RoIHRoZSB0YWIgaGVhZGluZyBhcmVhXHJcbiAgICAgIC8vYW5kIHRoZSB0YWIgY29udGVudCBhcmVhIGFyZSBsb2FkZWQuICBUcmFuc2NsdWRlICdlbSBib3RoLlxyXG4gICAgICBwYW5lLiR0cmFuc2NsdWRlRm4ocGFuZS4kcGFyZW50LCBmdW5jdGlvbihjb250ZW50cykge1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChjb250ZW50cywgZnVuY3Rpb24obm9kZSkge1xyXG4gICAgICAgICAgaWYgKGlzUGFuZUNhcHRpb24obm9kZSkpIHtcclxuICAgICAgICAgICAgLy9MZXQgdGFiSGVhZGluZ1RyYW5zY2x1ZGUga25vdy5cclxuICAgICAgICAgICAgcGFuZS5jYXB0aW9uRWxlbWVudCA9IG5vZGU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbG0uYXBwZW5kKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG4gIGZ1bmN0aW9uIGlzUGFuZUNhcHRpb24obm9kZSkge1xyXG4gICAgcmV0dXJuIG5vZGUudGFnTmFtZSAmJiAgKFxyXG4gICAgICBub2RlLmhhc0F0dHJpYnV0ZSgncGFuZS1jYXB0aW9uJykgfHxcclxuICAgICAgbm9kZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtcGFuZS1jYXB0aW9uJykgfHxcclxuICAgICAgbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwYW5lLWNhcHRpb24nIHx8XHJcbiAgICAgIG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGF0YS1wYW5lLWNhcHRpb24nXHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcbiJdfQ==
},{}],4:[function(require,module,exports){
(function (global){
var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90cmFuc2NsdWRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snYW5ndWxhciddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnYW5ndWxhciddIDogbnVsbCk7XHJcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgndWkud2lud2luJyk7XHJcblxyXG5tb2R1bGUuZGlyZWN0aXZlKCd1aVRyYW5zY2x1ZGUnLCBbJyRsb2cnLCBmdW5jdGlvbiAoJGxvZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFwicmVzdHJpY3RcIjogXCJBXCIsXHJcbiAgICAgICAgXCJsaW5rXCI6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIG51bGxDdHJsLCB0cmFuc2NsdWRlRm4pIHtcclxuICAgICAgICAgICAgdmFyIGVsU2NvcGUgPSBlbGVtZW50LnNjb3BlKCk7XHJcblxyXG4gICAgICAgICAgICB0cmFuc2NsdWRlRm4oZWxTY29wZSwgZnVuY3Rpb24gKGNsb25lKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZChjbG9uZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1dKTsiXX0=
},{}],5:[function(require,module,exports){
(function (global){
var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);
var module = angular.module('ui.winwin');

windowController.$inject = ['$scope'];

function windowController($scope) {
	var ctrl = this;
	var panes = ctrl.panes = $scope.panes = [];
	ctrl.select = function(selectedPane) {
		angular.forEach(panes, function(pane) {
			if(pane.active && pane !== selectedPane) {
				pane.active = false;
				pane.onDeselect();
			}
		});
		selectedPane.active = true;
		selectedPane.onSelect();
	}

	ctrl.addPane = function(pane) {
		panes.push(pane);
		if(panes.length === 1) {
			ctrl.select(pane);
		}
	}
	ctrl.removePane = function(pane) {
		var index = panes.indexOf(pane);
		panes.splice(index, 1);
		if(panes.length > 0) {
			ctrl.select(panes[0]);
		}
	}
	ctrl.createPane = function(caption, content) {
		
	}
}

module.controller('WindowController', windowController);

//

module.directive('window', function ($compile) {
      return {
		restrict: 'E',
		replace: true,
		transclude: true,
		require:'window',
		scope: {
			
		},
		template: '<div class="window"><div class="window-header" ui-transclude></div><div class="window-content"><div ng-repeat="pane in panes" ng-show="pane.active" pane-content-transclude="pane" id="{{id}}-content"></div></div>',
		controllerAs: 'vm',
		controller: 'WindowController',
		link:  function(scope, element, attr, windowController) {
			var self = this;
			function createPane(caption) {
					var newPane = $('<pane caption="'+caption+'"></pane>');
					var childScope = scope.$new(true);
					$compile(newPane)(childScope, undefined, {window: windowC});					
					return newPane;
			}

			var splitArea = $('body').children('.splitdroparea');
			if(!splitArea.length) {
				splitArea = $('<div class="splitdroparea" style="display:none;"></div>');
				splitArea.appendTo($('body'));
			}
			var headerContainer = element.children('.window-header');
			var container = element.children('.window-content');

			container.bind('drop', function(event) {
				var paneId = event.originalEvent.dataTransfer.getData('application/x-lx-window-pane');
				var area = getAreaFromEvent(event);
				var sourcePane = $('#'+ paneId);
				var sourceContentPane = $('#'+ paneId+"-content");

				var scp = angular.element(sourceContentPane).scope().pane;
				var newPane = angular.element('<pane caption="' + scp.caption + '"></pane>');
				
				newPane.append(sourceContentPane.contents());
				newPane.appendTo(headerContainer);
				$compile(newPane)(scope.$new(true), undefined, {window:windowController});
				scp.$destroy();
				sourcePane.remove();
				event.stopPropagation();
				event.preventDefault();
				splitArea.hide();
			});
			element.bind('dragend', function(event) {
				splitArea.hide();
				//successfully dropped?
				if(event.originalEvent.dataTransfer.dropEffect !== 'none') {
					console.log('dropped successfully');
				}
			});
			container.bind('dragenter', function(event) {
				for(var i=0;i<event.originalEvent.dataTransfer.types.length;i++) {
					var type = event.originalEvent.dataTransfer.types[i];
					if(type==='application/x-lx-window-pane') {
						event.stopPropagation();
						splitArea.show();
						return;
					} 
				}
			});

			container.bind('dragleave', function(event) {

			});

			container.bind('dragover', function(event) {
				var found = false;
				for(var i=0;i<event.originalEvent.dataTransfer.types.length;i++) {
					var type = event.originalEvent.dataTransfer.types[i];
					if(type==='application/x-lx-window-pane') {
						found = true;
						break;
					} 		
				}
				if(!found) {
					return;
				}
				event.preventDefault();
				event.stopPropagation();
				var target = event.currentTarget;
				var bounds = target.getBoundingClientRect();				
				var height = bounds.bottom - bounds.top;
				var width = bounds.right - bounds.left;

				var offset = container.offset();
				var area = getAreaFromEvent(event);
				switch(area) {
					case AREAS.TOP:
						splitArea.offset({top:offset.top, left:offset.left});
						splitArea.width(width);
						splitArea.height(height/2);
						break;	
					case AREAS.RIGHT:
						splitArea.offset({top:offset.top, left:offset.left+width/2});
						splitArea.width(width/2);
						splitArea.height(height);
						break;
					case AREAS.LEFT:
						splitArea.offset({top:offset.top, left:offset.left});
						splitArea.width(width/2);
						splitArea.height(height);
						break;
					case AREAS.BOTTOM:
						splitArea.offset({top:offset.top+height/2, left:offset.left});
						splitArea.width(width);
						splitArea.height(height/2);
						break;
				}
			});
		}
      };
  });

var AREAS = {
	TOP:'top', 
	LEFT:'left', 
	RIGHT:'right', 
	BOTTOM:'bottom'
}

function getAreaFromEvent(event) {
	var target = event.currentTarget;
	var bounds = target.getBoundingClientRect();				

    var posY = event.originalEvent.clientY - bounds.top;
    var posX = event.originalEvent.clientX - bounds.left;
    return getArea(bounds, posX, posY);
}


function getArea(bounds, posX, posY) {
	var height = bounds.bottom - bounds.top;
	var width = bounds.right - bounds.left;
	var pctY = posY/height;
	var pctX = posX/width;
	//calculate slopes
	var oAD = pctX/pctY>1;
	var oCB = pctX/(1-pctY)<=1;
	if(oAD) {
		if(oCB) {
			return AREAS.TOP;
		} else {
			return AREAS.RIGHT;
		}
	} else {
		if(oCB) {
			return AREAS.LEFT;
		} else {
			return AREAS.BOTTOM;
		}
	}
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi93aW5kb3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snYW5ndWxhciddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnYW5ndWxhciddIDogbnVsbCk7XHJcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgndWkud2lud2luJyk7XHJcblxyXG53aW5kb3dDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xyXG5cclxuZnVuY3Rpb24gd2luZG93Q29udHJvbGxlcigkc2NvcGUpIHtcclxuXHR2YXIgY3RybCA9IHRoaXM7XHJcblx0dmFyIHBhbmVzID0gY3RybC5wYW5lcyA9ICRzY29wZS5wYW5lcyA9IFtdO1xyXG5cdGN0cmwuc2VsZWN0ID0gZnVuY3Rpb24oc2VsZWN0ZWRQYW5lKSB7XHJcblx0XHRhbmd1bGFyLmZvckVhY2gocGFuZXMsIGZ1bmN0aW9uKHBhbmUpIHtcclxuXHRcdFx0aWYocGFuZS5hY3RpdmUgJiYgcGFuZSAhPT0gc2VsZWN0ZWRQYW5lKSB7XHJcblx0XHRcdFx0cGFuZS5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRwYW5lLm9uRGVzZWxlY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRzZWxlY3RlZFBhbmUuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdHNlbGVjdGVkUGFuZS5vblNlbGVjdCgpO1xyXG5cdH1cclxuXHJcblx0Y3RybC5hZGRQYW5lID0gZnVuY3Rpb24ocGFuZSkge1xyXG5cdFx0cGFuZXMucHVzaChwYW5lKTtcclxuXHRcdGlmKHBhbmVzLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRjdHJsLnNlbGVjdChwYW5lKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y3RybC5yZW1vdmVQYW5lID0gZnVuY3Rpb24ocGFuZSkge1xyXG5cdFx0dmFyIGluZGV4ID0gcGFuZXMuaW5kZXhPZihwYW5lKTtcclxuXHRcdHBhbmVzLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHRpZihwYW5lcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGN0cmwuc2VsZWN0KHBhbmVzWzBdKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y3RybC5jcmVhdGVQYW5lID0gZnVuY3Rpb24oY2FwdGlvbiwgY29udGVudCkge1xyXG5cdFx0XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuY29udHJvbGxlcignV2luZG93Q29udHJvbGxlcicsIHdpbmRvd0NvbnRyb2xsZXIpO1xyXG5cclxuLy9cclxuXHJcbm1vZHVsZS5kaXJlY3RpdmUoJ3dpbmRvdycsIGZ1bmN0aW9uICgkY29tcGlsZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG5cdFx0cmVzdHJpY3Q6ICdFJyxcclxuXHRcdHJlcGxhY2U6IHRydWUsXHJcblx0XHR0cmFuc2NsdWRlOiB0cnVlLFxyXG5cdFx0cmVxdWlyZTond2luZG93JyxcclxuXHRcdHNjb3BlOiB7XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cIndpbmRvd1wiPjxkaXYgY2xhc3M9XCJ3aW5kb3ctaGVhZGVyXCIgdWktdHJhbnNjbHVkZT48L2Rpdj48ZGl2IGNsYXNzPVwid2luZG93LWNvbnRlbnRcIj48ZGl2IG5nLXJlcGVhdD1cInBhbmUgaW4gcGFuZXNcIiBuZy1zaG93PVwicGFuZS5hY3RpdmVcIiBwYW5lLWNvbnRlbnQtdHJhbnNjbHVkZT1cInBhbmVcIiBpZD1cInt7aWR9fS1jb250ZW50XCI+PC9kaXY+PC9kaXY+JyxcclxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuXHRcdGNvbnRyb2xsZXI6ICdXaW5kb3dDb250cm9sbGVyJyxcclxuXHRcdGxpbms6ICBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0ciwgd2luZG93Q29udHJvbGxlcikge1xyXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdGZ1bmN0aW9uIGNyZWF0ZVBhbmUoY2FwdGlvbikge1xyXG5cdFx0XHRcdFx0dmFyIG5ld1BhbmUgPSAkKCc8cGFuZSBjYXB0aW9uPVwiJytjYXB0aW9uKydcIj48L3BhbmU+Jyk7XHJcblx0XHRcdFx0XHR2YXIgY2hpbGRTY29wZSA9IHNjb3BlLiRuZXcodHJ1ZSk7XHJcblx0XHRcdFx0XHQkY29tcGlsZShuZXdQYW5lKShjaGlsZFNjb3BlLCB1bmRlZmluZWQsIHt3aW5kb3c6IHdpbmRvd0N9KTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3UGFuZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHNwbGl0QXJlYSA9ICQoJ2JvZHknKS5jaGlsZHJlbignLnNwbGl0ZHJvcGFyZWEnKTtcclxuXHRcdFx0aWYoIXNwbGl0QXJlYS5sZW5ndGgpIHtcclxuXHRcdFx0XHRzcGxpdEFyZWEgPSAkKCc8ZGl2IGNsYXNzPVwic3BsaXRkcm9wYXJlYVwiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPjwvZGl2PicpO1xyXG5cdFx0XHRcdHNwbGl0QXJlYS5hcHBlbmRUbygkKCdib2R5JykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBoZWFkZXJDb250YWluZXIgPSBlbGVtZW50LmNoaWxkcmVuKCcud2luZG93LWhlYWRlcicpO1xyXG5cdFx0XHR2YXIgY29udGFpbmVyID0gZWxlbWVudC5jaGlsZHJlbignLndpbmRvdy1jb250ZW50Jyk7XHJcblxyXG5cdFx0XHRjb250YWluZXIuYmluZCgnZHJvcCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0dmFyIHBhbmVJZCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2FwcGxpY2F0aW9uL3gtbHgtd2luZG93LXBhbmUnKTtcclxuXHRcdFx0XHR2YXIgYXJlYSA9IGdldEFyZWFGcm9tRXZlbnQoZXZlbnQpO1xyXG5cdFx0XHRcdHZhciBzb3VyY2VQYW5lID0gJCgnIycrIHBhbmVJZCk7XHJcblx0XHRcdFx0dmFyIHNvdXJjZUNvbnRlbnRQYW5lID0gJCgnIycrIHBhbmVJZCtcIi1jb250ZW50XCIpO1xyXG5cclxuXHRcdFx0XHR2YXIgc2NwID0gYW5ndWxhci5lbGVtZW50KHNvdXJjZUNvbnRlbnRQYW5lKS5zY29wZSgpLnBhbmU7XHJcblx0XHRcdFx0dmFyIG5ld1BhbmUgPSBhbmd1bGFyLmVsZW1lbnQoJzxwYW5lIGNhcHRpb249XCInICsgc2NwLmNhcHRpb24gKyAnXCI+PC9wYW5lPicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdG5ld1BhbmUuYXBwZW5kKHNvdXJjZUNvbnRlbnRQYW5lLmNvbnRlbnRzKCkpO1xyXG5cdFx0XHRcdG5ld1BhbmUuYXBwZW5kVG8oaGVhZGVyQ29udGFpbmVyKTtcclxuXHRcdFx0XHQkY29tcGlsZShuZXdQYW5lKShzY29wZS4kbmV3KHRydWUpLCB1bmRlZmluZWQsIHt3aW5kb3c6d2luZG93Q29udHJvbGxlcn0pO1xyXG5cdFx0XHRcdHNjcC4kZGVzdHJveSgpO1xyXG5cdFx0XHRcdHNvdXJjZVBhbmUucmVtb3ZlKCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRzcGxpdEFyZWEuaGlkZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0ZWxlbWVudC5iaW5kKCdkcmFnZW5kJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRzcGxpdEFyZWEuaGlkZSgpO1xyXG5cdFx0XHRcdC8vc3VjY2Vzc2Z1bGx5IGRyb3BwZWQ/XHJcblx0XHRcdFx0aWYoZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCAhPT0gJ25vbmUnKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnZHJvcHBlZCBzdWNjZXNzZnVsbHknKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjb250YWluZXIuYmluZCgnZHJhZ2VudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRmb3IodmFyIGk9MDtpPGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzLmxlbmd0aDtpKyspIHtcclxuXHRcdFx0XHRcdHZhciB0eXBlID0gZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIudHlwZXNbaV07XHJcblx0XHRcdFx0XHRpZih0eXBlPT09J2FwcGxpY2F0aW9uL3gtbHgtd2luZG93LXBhbmUnKSB7XHJcblx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHRzcGxpdEFyZWEuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9IFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRjb250YWluZXIuYmluZCgnZHJhZ2xlYXZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Y29udGFpbmVyLmJpbmQoJ2RyYWdvdmVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHR2YXIgZm91bmQgPSBmYWxzZTtcclxuXHRcdFx0XHRmb3IodmFyIGk9MDtpPGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzLmxlbmd0aDtpKyspIHtcclxuXHRcdFx0XHRcdHZhciB0eXBlID0gZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIudHlwZXNbaV07XHJcblx0XHRcdFx0XHRpZih0eXBlPT09J2FwcGxpY2F0aW9uL3gtbHgtd2luZG93LXBhbmUnKSB7XHJcblx0XHRcdFx0XHRcdGZvdW5kID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9IFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoIWZvdW5kKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0dmFyIHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblx0XHRcdFx0dmFyIGJvdW5kcyA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcdFx0XHRcdFxyXG5cdFx0XHRcdHZhciBoZWlnaHQgPSBib3VuZHMuYm90dG9tIC0gYm91bmRzLnRvcDtcclxuXHRcdFx0XHR2YXIgd2lkdGggPSBib3VuZHMucmlnaHQgLSBib3VuZHMubGVmdDtcclxuXHJcblx0XHRcdFx0dmFyIG9mZnNldCA9IGNvbnRhaW5lci5vZmZzZXQoKTtcclxuXHRcdFx0XHR2YXIgYXJlYSA9IGdldEFyZWFGcm9tRXZlbnQoZXZlbnQpO1xyXG5cdFx0XHRcdHN3aXRjaChhcmVhKSB7XHJcblx0XHRcdFx0XHRjYXNlIEFSRUFTLlRPUDpcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLm9mZnNldCh7dG9wOm9mZnNldC50b3AsIGxlZnQ6b2Zmc2V0LmxlZnR9KTtcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLndpZHRoKHdpZHRoKTtcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLmhlaWdodChoZWlnaHQvMik7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1x0XHJcblx0XHRcdFx0XHRjYXNlIEFSRUFTLlJJR0hUOlxyXG5cdFx0XHRcdFx0XHRzcGxpdEFyZWEub2Zmc2V0KHt0b3A6b2Zmc2V0LnRvcCwgbGVmdDpvZmZzZXQubGVmdCt3aWR0aC8yfSk7XHJcblx0XHRcdFx0XHRcdHNwbGl0QXJlYS53aWR0aCh3aWR0aC8yKTtcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLmhlaWdodChoZWlnaHQpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgQVJFQVMuTEVGVDpcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLm9mZnNldCh7dG9wOm9mZnNldC50b3AsIGxlZnQ6b2Zmc2V0LmxlZnR9KTtcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLndpZHRoKHdpZHRoLzIpO1xyXG5cdFx0XHRcdFx0XHRzcGxpdEFyZWEuaGVpZ2h0KGhlaWdodCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSBBUkVBUy5CT1RUT006XHJcblx0XHRcdFx0XHRcdHNwbGl0QXJlYS5vZmZzZXQoe3RvcDpvZmZzZXQudG9wK2hlaWdodC8yLCBsZWZ0Om9mZnNldC5sZWZ0fSk7XHJcblx0XHRcdFx0XHRcdHNwbGl0QXJlYS53aWR0aCh3aWR0aCk7XHJcblx0XHRcdFx0XHRcdHNwbGl0QXJlYS5oZWlnaHQoaGVpZ2h0LzIpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG4gICAgICB9O1xyXG4gIH0pO1xyXG5cclxudmFyIEFSRUFTID0ge1xyXG5cdFRPUDondG9wJywgXHJcblx0TEVGVDonbGVmdCcsIFxyXG5cdFJJR0hUOidyaWdodCcsIFxyXG5cdEJPVFRPTTonYm90dG9tJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBcmVhRnJvbUV2ZW50KGV2ZW50KSB7XHJcblx0dmFyIHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblx0dmFyIGJvdW5kcyA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcdFx0XHRcdFxyXG5cclxuICAgIHZhciBwb3NZID0gZXZlbnQub3JpZ2luYWxFdmVudC5jbGllbnRZIC0gYm91bmRzLnRvcDtcclxuICAgIHZhciBwb3NYID0gZXZlbnQub3JpZ2luYWxFdmVudC5jbGllbnRYIC0gYm91bmRzLmxlZnQ7XHJcbiAgICByZXR1cm4gZ2V0QXJlYShib3VuZHMsIHBvc1gsIHBvc1kpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QXJlYShib3VuZHMsIHBvc1gsIHBvc1kpIHtcclxuXHR2YXIgaGVpZ2h0ID0gYm91bmRzLmJvdHRvbSAtIGJvdW5kcy50b3A7XHJcblx0dmFyIHdpZHRoID0gYm91bmRzLnJpZ2h0IC0gYm91bmRzLmxlZnQ7XHJcblx0dmFyIHBjdFkgPSBwb3NZL2hlaWdodDtcclxuXHR2YXIgcGN0WCA9IHBvc1gvd2lkdGg7XHJcblx0Ly9jYWxjdWxhdGUgc2xvcGVzXHJcblx0dmFyIG9BRCA9IHBjdFgvcGN0WT4xO1xyXG5cdHZhciBvQ0IgPSBwY3RYLygxLXBjdFkpPD0xO1xyXG5cdGlmKG9BRCkge1xyXG5cdFx0aWYob0NCKSB7XHJcblx0XHRcdHJldHVybiBBUkVBUy5UT1A7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gQVJFQVMuUklHSFQ7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmKG9DQikge1xyXG5cdFx0XHRyZXR1cm4gQVJFQVMuTEVGVDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBBUkVBUy5CT1RUT007XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==
},{}],6:[function(require,module,exports){
module.exports = require('./lib');
},{"./lib":8}],7:[function(require,module,exports){
(function (global){
var angular = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null);
var boxModule = angular.module('ui.box');
require('./transclude-replace');

var _makeDirective = function(direction) {
	var _modeHorizontal = direction==='horizontal';
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<div class="splitbox"><div class="splitter"><div> </div></div><div ui-transclude-replace/></div>',
		link:  function(scope, element, attr) {
	var _isDragging = false;

	var splitter = element.children().eq(0);
	var splitterSize = attr.splitterSize || 1;
	var oneMinSize = attr.oneMinSize || 1;
	var twoMinSize = attr.twoMinSize || 1;

	var one = element.children().eq(1);
	var two = element.children().eq(2);
	element.addClass(_modeHorizontal ? 'horizontal' : 'vertical');
	splitter.addClass(_modeHorizontal ? 'horizontal' : 'vertical');
	one.addClass('splitboxbox');
	two.addClass('splitboxbox');
	
	element.bind('mousemove', function(event) {
		if(!_isDragging) {
			return;
		} else {
			var bounds = element[0].getBoundingClientRect();


			if(_modeHorizontal) {
				_tick(event.clientY);
			}
			else {
				_tick(event.clientX);
			}
		}
	});

	splitter.bind('mousedown', function(event) {
		event.preventDefault();
		_isDragging = true;
	});
	angular.element(document).bind('mouseup', function(event) {
		_isDragging = false;
	});

	function _tick(mousePos) {
		var pct = 0;
		var bounds = element[0].getBoundingClientRect();

		if(_modeHorizontal){
		    var height = bounds.bottom - bounds.top;
		    var pos = mousePos - bounds.top;
            if (pos < oneMinSize) return;
		    if (height - pos < twoMinSize) return;

			pct = pos/height*100;
	    	splitter.css('top',pct + '%');
	    	one.css('height', pct + '%');
		    two.css('top', pct + '%');			
		} else {
		    var width = bounds.right - bounds.left;
		    var pos = mousePos - bounds.left;
            if (pos < oneMinSize) return;
		    if (width - pos < twoMinSize) return;

			pct = pos/width*100;
		   splitter.css('left',pct + '%');
		    one.css('width', pct + '%');
	    	two.css('left', pct + '%');			

		}
	}

//			var firstBounds = one.getBoundingClientRect();
	var _init = function() {
		var bounds = element[0].getBoundingClientRect();		
		if(_modeHorizontal) {
			_tick((bounds.bottom - bounds.top)/2);
		} else{
			_tick((bounds.right - bounds.top)/2);
		}
	}
	_init();
}

	}
}

boxModule.directive('hbox', function() {
	return _makeDirective('horizontal');
});

boxModule.directive('vbox', function() {
	return _makeDirective('vertical');
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zcGxpdGJveC9saWIvYm94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5hbmd1bGFyIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5hbmd1bGFyIDogbnVsbCk7XHJcbnZhciBib3hNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgndWkuYm94Jyk7XHJcbnJlcXVpcmUoJy4vdHJhbnNjbHVkZS1yZXBsYWNlJyk7XHJcblxyXG52YXIgX21ha2VEaXJlY3RpdmUgPSBmdW5jdGlvbihkaXJlY3Rpb24pIHtcclxuXHR2YXIgX21vZGVIb3Jpem9udGFsID0gZGlyZWN0aW9uPT09J2hvcml6b250YWwnO1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDogJ0UnLFxyXG5cdFx0cmVwbGFjZTogdHJ1ZSxcclxuXHRcdHRyYW5zY2x1ZGU6IHRydWUsXHJcblx0XHR0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJzcGxpdGJveFwiPjxkaXYgY2xhc3M9XCJzcGxpdHRlclwiPjxkaXY+IDwvZGl2PjwvZGl2PjxkaXYgdWktdHJhbnNjbHVkZS1yZXBsYWNlLz48L2Rpdj4nLFxyXG5cdFx0bGluazogIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XHJcblx0dmFyIF9pc0RyYWdnaW5nID0gZmFsc2U7XHJcblxyXG5cdHZhciBzcGxpdHRlciA9IGVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKTtcclxuXHR2YXIgc3BsaXR0ZXJTaXplID0gYXR0ci5zcGxpdHRlclNpemUgfHwgMTtcclxuXHR2YXIgb25lTWluU2l6ZSA9IGF0dHIub25lTWluU2l6ZSB8fCAxO1xyXG5cdHZhciB0d29NaW5TaXplID0gYXR0ci50d29NaW5TaXplIHx8IDE7XHJcblxyXG5cdHZhciBvbmUgPSBlbGVtZW50LmNoaWxkcmVuKCkuZXEoMSk7XHJcblx0dmFyIHR3byA9IGVsZW1lbnQuY2hpbGRyZW4oKS5lcSgyKTtcclxuXHRlbGVtZW50LmFkZENsYXNzKF9tb2RlSG9yaXpvbnRhbCA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCcpO1xyXG5cdHNwbGl0dGVyLmFkZENsYXNzKF9tb2RlSG9yaXpvbnRhbCA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCcpO1xyXG5cdG9uZS5hZGRDbGFzcygnc3BsaXRib3hib3gnKTtcclxuXHR0d28uYWRkQ2xhc3MoJ3NwbGl0Ym94Ym94Jyk7XHJcblx0XHJcblx0ZWxlbWVudC5iaW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0aWYoIV9pc0RyYWdnaW5nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBib3VuZHMgPSBlbGVtZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHJcblx0XHRcdGlmKF9tb2RlSG9yaXpvbnRhbCkge1xyXG5cdFx0XHRcdF90aWNrKGV2ZW50LmNsaWVudFkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdF90aWNrKGV2ZW50LmNsaWVudFgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHNwbGl0dGVyLmJpbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0X2lzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cdH0pO1xyXG5cdGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkuYmluZCgnbW91c2V1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRfaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBfdGljayhtb3VzZVBvcykge1xyXG5cdFx0dmFyIHBjdCA9IDA7XHJcblx0XHR2YXIgYm91bmRzID0gZWxlbWVudFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRpZihfbW9kZUhvcml6b250YWwpe1xyXG5cdFx0ICAgIHZhciBoZWlnaHQgPSBib3VuZHMuYm90dG9tIC0gYm91bmRzLnRvcDtcclxuXHRcdCAgICB2YXIgcG9zID0gbW91c2VQb3MgLSBib3VuZHMudG9wO1xyXG4gICAgICAgICAgICBpZiAocG9zIDwgb25lTWluU2l6ZSkgcmV0dXJuO1xyXG5cdFx0ICAgIGlmIChoZWlnaHQgLSBwb3MgPCB0d29NaW5TaXplKSByZXR1cm47XHJcblxyXG5cdFx0XHRwY3QgPSBwb3MvaGVpZ2h0KjEwMDtcclxuXHQgICAgXHRzcGxpdHRlci5jc3MoJ3RvcCcscGN0ICsgJyUnKTtcclxuXHQgICAgXHRvbmUuY3NzKCdoZWlnaHQnLCBwY3QgKyAnJScpO1xyXG5cdFx0ICAgIHR3by5jc3MoJ3RvcCcsIHBjdCArICclJyk7XHRcdFx0XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0ICAgIHZhciB3aWR0aCA9IGJvdW5kcy5yaWdodCAtIGJvdW5kcy5sZWZ0O1xyXG5cdFx0ICAgIHZhciBwb3MgPSBtb3VzZVBvcyAtIGJvdW5kcy5sZWZ0O1xyXG4gICAgICAgICAgICBpZiAocG9zIDwgb25lTWluU2l6ZSkgcmV0dXJuO1xyXG5cdFx0ICAgIGlmICh3aWR0aCAtIHBvcyA8IHR3b01pblNpemUpIHJldHVybjtcclxuXHJcblx0XHRcdHBjdCA9IHBvcy93aWR0aCoxMDA7XHJcblx0XHQgICBzcGxpdHRlci5jc3MoJ2xlZnQnLHBjdCArICclJyk7XHJcblx0XHQgICAgb25lLmNzcygnd2lkdGgnLCBwY3QgKyAnJScpO1xyXG5cdCAgICBcdHR3by5jc3MoJ2xlZnQnLCBwY3QgKyAnJScpO1x0XHRcdFxyXG5cclxuXHRcdH1cclxuXHR9XHJcblxyXG4vL1x0XHRcdHZhciBmaXJzdEJvdW5kcyA9IG9uZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHR2YXIgX2luaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBib3VuZHMgPSBlbGVtZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1x0XHRcclxuXHRcdGlmKF9tb2RlSG9yaXpvbnRhbCkge1xyXG5cdFx0XHRfdGljaygoYm91bmRzLmJvdHRvbSAtIGJvdW5kcy50b3ApLzIpO1xyXG5cdFx0fSBlbHNle1xyXG5cdFx0XHRfdGljaygoYm91bmRzLnJpZ2h0IC0gYm91bmRzLnRvcCkvMik7XHJcblx0XHR9XHJcblx0fVxyXG5cdF9pbml0KCk7XHJcbn1cclxuXHJcblx0fVxyXG59XHJcblxyXG5ib3hNb2R1bGUuZGlyZWN0aXZlKCdoYm94JywgZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIF9tYWtlRGlyZWN0aXZlKCdob3Jpem9udGFsJyk7XHJcbn0pO1xyXG5cclxuYm94TW9kdWxlLmRpcmVjdGl2ZSgndmJveCcsIGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiBfbWFrZURpcmVjdGl2ZSgndmVydGljYWwnKTtcclxufSk7Il19
},{"./transclude-replace":9}],8:[function(require,module,exports){
var boxModule = angular.module('ui.box', []);

require('./box');
},{"./box":7}],9:[function(require,module,exports){
(function (global){
var angular = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null);
var boxModule = angular.module('ui.box');

boxModule.directive('uiTranscludeReplace', ['$log', function ($log) {
      return {
          terminal: true,
          restrict: 'EA',

          link: function ($scope, $element, $attr, ctrl, transclude) {
              if (!transclude) {
                  $log.error('orphan',
                             'Illegal use of uiTranscludeReplace directive in the template! ' +
                             'No parent directive that requires a transclusion found. ');
                  return;
              }
              transclude($element.scope(), function (clone) {
                  if (clone.length) {
                      $element.replaceWith(clone);
                  }
                  else {
                      $element.remove();
                  }
              });
          }
      };
  }]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zcGxpdGJveC9saWIvdHJhbnNjbHVkZS1yZXBsYWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYW5ndWxhciA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmFuZ3VsYXIgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsLmFuZ3VsYXIgOiBudWxsKTtcclxudmFyIGJveE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCd1aS5ib3gnKTtcclxuXHJcbmJveE1vZHVsZS5kaXJlY3RpdmUoJ3VpVHJhbnNjbHVkZVJlcGxhY2UnLCBbJyRsb2cnLCBmdW5jdGlvbiAoJGxvZykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdGVybWluYWw6IHRydWUsXHJcbiAgICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuXHJcbiAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIsIGN0cmwsIHRyYW5zY2x1ZGUpIHtcclxuICAgICAgICAgICAgICBpZiAoIXRyYW5zY2x1ZGUpIHtcclxuICAgICAgICAgICAgICAgICAgJGxvZy5lcnJvcignb3JwaGFuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnSWxsZWdhbCB1c2Ugb2YgdWlUcmFuc2NsdWRlUmVwbGFjZSBkaXJlY3RpdmUgaW4gdGhlIHRlbXBsYXRlISAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTm8gcGFyZW50IGRpcmVjdGl2ZSB0aGF0IHJlcXVpcmVzIGEgdHJhbnNjbHVzaW9uIGZvdW5kLiAnKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0cmFuc2NsdWRlKCRlbGVtZW50LnNjb3BlKCksIGZ1bmN0aW9uIChjbG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoY2xvbmUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZXBsYWNlV2l0aChjbG9uZSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gIH1dKTsiXX0=
},{}],10:[function(require,module,exports){
require('splitbox');
require('..');
},{"..":1,"splitbox":6}]},{},[10])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9pbmRleC5qcyIsImxpYi9wYW5lLmpzIiwibGliL3RyYW5zY2x1ZGUuanMiLCJsaWIvd2luZG93LmpzIiwibm9kZV9tb2R1bGVzL3NwbGl0Ym94L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NwbGl0Ym94L2xpYi9ib3guanMiLCJub2RlX21vZHVsZXMvc3BsaXRib3gvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NwbGl0Ym94L2xpYi90cmFuc2NsdWRlLXJlcGxhY2UuanMiLCJ0ZXN0L2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hNQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi9saWInKTsiLCJ2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3VpLndpbndpbicsIFtdKTtcclxucmVxdWlyZSgnLi90cmFuc2NsdWRlJyk7XHJcbnJlcXVpcmUoJy4vd2luZG93Jyk7XHJcbnJlcXVpcmUoJy4vcGFuZScpOyIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBhbmd1bGFyID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2FuZ3VsYXInXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2FuZ3VsYXInXSA6IG51bGwpO1xyXG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3VpLndpbndpbicpO1xyXG5cclxudmFyIHBhbmVJZCA9IDA7XHJcblxyXG5tb2R1bGUuZGlyZWN0aXZlKCdwYW5lJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG5cdFx0cmVzdHJpY3Q6ICdFJyxcclxuXHRcdHJlcXVpcmU6J153aW5kb3cnLFxyXG5cdFx0cmVwbGFjZTogdHJ1ZSxcclxuXHRcdHRyYW5zY2x1ZGU6IHRydWUsXHJcblx0XHRzY29wZToge1xyXG5cdFx0XHRjYXB0aW9uOiAnQCcsXHJcblx0XHRcdGFjdGl2ZTogJz0/JyxcclxuXHRcdFx0b25TZWxlY3Q6ICcmc2VsZWN0JyxcclxuXHRcdFx0b25EZXNlbGVjdDogJyZkZXNlbGVjdCdcclxuXHRcdH0sXHJcblx0XHR0ZW1wbGF0ZTogJzxkaXYgaWQ9XCJ7e2lkfX1cIiBuZy1jbGFzcz1cInthY3RpdmU6IGFjdGl2ZX1cIj48YSBocmVmIGRyYWdnYWJsZT1cInRydWVcIiBuZy1jbGljaz1cInNlbGVjdCgpXCIgcGFuZS1jYXB0aW9uLXRyYW5zY2x1ZGU+e3tjYXB0aW9ufX08L2E+PC9kaXY+JyxcclxuXHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cdFx0fSxcclxuXHRcdGNvbXBpbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHJzLCB0cmFuc2NsdWRlKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gcG9zdExpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHIsIHdpbmRvd0N0cmwpIHtcclxuXHRcdFx0XHRzY29wZS5pZCA9ICd3bmQtcGFuZScgKyBwYW5lSWQrKztcclxuXHRcdFx0XHRzY29wZS5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHR3aW5kb3dDdHJsLmFkZFBhbmUoc2NvcGUpO1xyXG5cdFx0XHRcdHNjb3BlLiR3YXRjaCgnYWN0aXZlJywgZnVuY3Rpb24oYWN0aXZlKSB7XHJcblx0ICAgICAgICAgIFx0XHRpZiAoYWN0aXZlKSB7XHJcblx0XHRcdCAgICAgICAgICAgIHdpbmRvd0N0cmwuc2VsZWN0KHNjb3BlKTtcclxuXHQgICAgXHQgICAgXHR9XHJcblx0ICAgICAgIFx0XHR9KTtcclxuXHQgICAgICAgXHRcdHNjb3BlLnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xyXG5cdCAgICAgICBcdFx0XHRzY29wZS5hY3RpdmUgPSB0cnVlO1xyXG5cdC8vICAgICAgIFx0XHRcdHdpbmRvd0N0cmwuc2VsZWN0KHNjb3BlKTtcclxuXHQgICAgICAgXHRcdH1cclxuXHQgICAgICAgXHRcdHNjb3BlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0d2luZG93Q3RybC5yZW1vdmVQYW5lKHNjb3BlKTtcclxuXHQgICAgICAgXHRcdH1cclxuXHJcblx0XHRcdFx0ZWxlbWVudC5vbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHNjb3BlLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0c2NvcGUuJGRlc3Ryb3koKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRlbGVtZW50LmJpbmQoJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0XHRldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdhcHBsaWNhdGlvbi94LWx4LXdpbmRvdy1wYW5lJywgc2NvcGUuaWQpO1xyXG4gIFx0XHRcdFx0XHRldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdUZXh0JywgJ2dvc3UnKTtcclxuICBcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHNjb3BlLiR0cmFuc2NsdWRlRm4gPSB0cmFuc2NsdWRlO1x0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICAgIH07XHJcbiAgfSk7XHJcblxyXG5tb2R1bGUuZGlyZWN0aXZlKCdwYW5lQ2FwdGlvblRyYW5zY2x1ZGUnLCBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgIHJlcXVpcmU6ICdecGFuZScsXHJcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxtLCBhdHRycywgdGFiQ3RybCkge1xyXG4gICAgICBzY29wZS4kd2F0Y2goJ2NhcHRpb25FbGVtZW50JywgZnVuY3Rpb24gdXBkYXRlSGVhZGluZ0VsZW1lbnQoY2FwdGlvbikge1xyXG4gICAgICAgIGlmIChjYXB0aW9uKSB7XHJcbiAgICAgICAgICBlbG0uaHRtbCgnJyk7XHJcbiAgICAgICAgICBlbG0uYXBwZW5kKGNhcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSk7XHJcblxyXG5tb2R1bGUuZGlyZWN0aXZlKCdwYW5lQ29udGVudFRyYW5zY2x1ZGUnLCBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgIHJlcXVpcmU6ICded2luZG93JyxcclxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbG0sIGF0dHJzKSB7XHJcbiAgICAgIHZhciBwYW5lID0gc2NvcGUuJGV2YWwoYXR0cnMucGFuZUNvbnRlbnRUcmFuc2NsdWRlKTtcclxuICAgICAgc2NvcGUuaWQgPSBwYW5lLmlkO1xyXG5cclxuICAgICAgLy9Ob3cgb3VyIHRhYiBpcyByZWFkeSB0byBiZSB0cmFuc2NsdWRlZDogYm90aCB0aGUgdGFiIGhlYWRpbmcgYXJlYVxyXG4gICAgICAvL2FuZCB0aGUgdGFiIGNvbnRlbnQgYXJlYSBhcmUgbG9hZGVkLiAgVHJhbnNjbHVkZSAnZW0gYm90aC5cclxuICAgICAgcGFuZS4kdHJhbnNjbHVkZUZuKHBhbmUuJHBhcmVudCwgZnVuY3Rpb24oY29udGVudHMpIHtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2goY29udGVudHMsIGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgICAgICAgIGlmIChpc1BhbmVDYXB0aW9uKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIC8vTGV0IHRhYkhlYWRpbmdUcmFuc2NsdWRlIGtub3cuXHJcbiAgICAgICAgICAgIHBhbmUuY2FwdGlvbkVsZW1lbnQgPSBub2RlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWxtLmFwcGVuZChub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBmdW5jdGlvbiBpc1BhbmVDYXB0aW9uKG5vZGUpIHtcclxuICAgIHJldHVybiBub2RlLnRhZ05hbWUgJiYgIChcclxuICAgICAgbm9kZS5oYXNBdHRyaWJ1dGUoJ3BhbmUtY2FwdGlvbicpIHx8XHJcbiAgICAgIG5vZGUuaGFzQXR0cmlidXRlKCdkYXRhLXBhbmUtY2FwdGlvbicpIHx8XHJcbiAgICAgIG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncGFuZS1jYXB0aW9uJyB8fFxyXG4gICAgICBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2RhdGEtcGFuZS1jYXB0aW9uJ1xyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW14cFlpOXdZVzVsTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWRtRnlJR0Z1WjNWc1lYSWdQU0FvZEhsd1pXOW1JSGRwYm1SdmR5QWhQVDBnWENKMWJtUmxabWx1WldSY0lpQS9JSGRwYm1SdmQxc25ZVzVuZFd4aGNpZGRJRG9nZEhsd1pXOW1JR2RzYjJKaGJDQWhQVDBnWENKMWJtUmxabWx1WldSY0lpQS9JR2RzYjJKaGJGc25ZVzVuZFd4aGNpZGRJRG9nYm5Wc2JDazdYSEpjYm5aaGNpQnRiMlIxYkdVZ1BTQmhibWQxYkdGeUxtMXZaSFZzWlNnbmRXa3VkMmx1ZDJsdUp5azdYSEpjYmx4eVhHNTJZWElnY0dGdVpVbGtJRDBnTUR0Y2NseHVYSEpjYm0xdlpIVnNaUzVrYVhKbFkzUnBkbVVvSjNCaGJtVW5MQ0JtZFc1amRHbHZiaUFvS1NCN1hISmNiaUFnSUNBZ0lISmxkSFZ5YmlCN1hISmNibHgwWEhSeVpYTjBjbWxqZERvZ0owVW5MRnh5WEc1Y2RGeDBjbVZ4ZFdseVpUb25YbmRwYm1SdmR5Y3NYSEpjYmx4MFhIUnlaWEJzWVdObE9pQjBjblZsTEZ4eVhHNWNkRngwZEhKaGJuTmpiSFZrWlRvZ2RISjFaU3hjY2x4dVhIUmNkSE5qYjNCbE9pQjdYSEpjYmx4MFhIUmNkR05oY0hScGIyNDZJQ2RBSnl4Y2NseHVYSFJjZEZ4MFlXTjBhWFpsT2lBblBUOG5MRnh5WEc1Y2RGeDBYSFJ2YmxObGJHVmpkRG9nSnlaelpXeGxZM1FuTEZ4eVhHNWNkRngwWEhSdmJrUmxjMlZzWldOME9pQW5KbVJsYzJWc1pXTjBKMXh5WEc1Y2RGeDBmU3hjY2x4dVhIUmNkSFJsYlhCc1lYUmxPaUFuUEdScGRpQnBaRDFjSW50N2FXUjlmVndpSUc1bkxXTnNZWE56UFZ3aWUyRmpkR2wyWlRvZ1lXTjBhWFpsZlZ3aVBqeGhJR2h5WldZZ1pISmhaMmRoWW14bFBWd2lkSEoxWlZ3aUlHNW5MV05zYVdOclBWd2ljMlZzWldOMEtDbGNJaUJ3WVc1bExXTmhjSFJwYjI0dGRISmhibk5qYkhWa1pUNTdlMk5oY0hScGIyNTlmVHd2WVQ0OEwyUnBkajRuTEZ4eVhHNWNkRngwWTI5dWRISnZiR3hsY2pvZ1puVnVZM1JwYjI0b0pITmpiM0JsS1NCN1hISmNibHgwWEhSOUxGeHlYRzVjZEZ4MFkyOXRjR2xzWlRvZ1puVnVZM1JwYjI0b1pXeGxiV1Z1ZEN3Z1lYUjBjbk1zSUhSeVlXNXpZMngxWkdVcElIdGNjbHh1WEhKY2JseDBYSFJjZEhKbGRIVnliaUJtZFc1amRHbHZiaUJ3YjNOMFRHbHVheWh6WTI5d1pTd2daV3hsYldWdWRDd2dZWFIwY2l3Z2QybHVaRzkzUTNSeWJDa2dlMXh5WEc1Y2RGeDBYSFJjZEhOamIzQmxMbWxrSUQwZ0ozZHVaQzF3WVc1bEp5QXJJSEJoYm1WSlpDc3JPMXh5WEc1Y2RGeDBYSFJjZEhOamIzQmxMbUZqZEdsMlpTQTlJR1poYkhObE8xeHlYRzVjZEZ4MFhIUmNkSGRwYm1SdmQwTjBjbXd1WVdSa1VHRnVaU2h6WTI5d1pTazdYSEpjYmx4MFhIUmNkRngwYzJOdmNHVXVKSGRoZEdOb0tDZGhZM1JwZG1VbkxDQm1kVzVqZEdsdmJpaGhZM1JwZG1VcElIdGNjbHh1WEhRZ0lDQWdJQ0FnSUNBZ1hIUmNkR2xtSUNoaFkzUnBkbVVwSUh0Y2NseHVYSFJjZEZ4MElDQWdJQ0FnSUNBZ0lDQWdkMmx1Wkc5M1EzUnliQzV6Wld4bFkzUW9jMk52Y0dVcE8xeHlYRzVjZENBZ0lDQmNkQ0FnSUNCY2RIMWNjbHh1WEhRZ0lDQWdJQ0FnWEhSY2RIMHBPMXh5WEc1Y2RDQWdJQ0FnSUNCY2RGeDBjMk52Y0dVdWMyVnNaV04wSUQwZ1puVnVZM1JwYjI0b0tTQjdYSEpjYmx4MElDQWdJQ0FnSUZ4MFhIUmNkSE5qYjNCbExtRmpkR2wyWlNBOUlIUnlkV1U3WEhKY2JseDBMeThnSUNBZ0lDQWdYSFJjZEZ4MGQybHVaRzkzUTNSeWJDNXpaV3hsWTNRb2MyTnZjR1VwTzF4eVhHNWNkQ0FnSUNBZ0lDQmNkRngwZlZ4eVhHNWNkQ0FnSUNBZ0lDQmNkRngwYzJOdmNHVXVjbVZ0YjNabElEMGdablZ1WTNScGIyNG9LU0I3WEhKY2JseDBYSFJjZEZ4MFhIUjNhVzVrYjNkRGRISnNMbkpsYlc5MlpWQmhibVVvYzJOdmNHVXBPMXh5WEc1Y2RDQWdJQ0FnSUNCY2RGeDBmVnh5WEc1Y2NseHVYSFJjZEZ4MFhIUmxiR1Z0Wlc1MExtOXVLQ2NrWkdWemRISnZlU2NzSUdaMWJtTjBhVzl1S0NrZ2UxeHlYRzVjZEZ4MFhIUmNkRngwYzJOdmNHVXVjbVZ0YjNabEtDazdYSEpjYmx4MFhIUmNkRngwWEhSelkyOXdaUzRrWkdWemRISnZlU2dwTzF4eVhHNWNkRngwWEhSY2RIMHBPMXh5WEc1Y2RGeDBYSFJjZEdWc1pXMWxiblF1WW1sdVpDZ25aSEpoWjNOMFlYSjBKeXdnWm5WdVkzUnBiMjRvWlhabGJuUXBJSHRjY2x4dVhIUmNkRngwWEhSY2RHVjJaVzUwTG05eWFXZHBibUZzUlhabGJuUXVaR0YwWVZSeVlXNXpabVZ5TG5ObGRFUmhkR0VvSjJGd2NHeHBZMkYwYVc5dUwzZ3RiSGd0ZDJsdVpHOTNMWEJoYm1VbkxDQnpZMjl3WlM1cFpDazdYSEpjYmlBZ1hIUmNkRngwWEhSY2RHVjJaVzUwTG05eWFXZHBibUZzUlhabGJuUXVaR0YwWVZSeVlXNXpabVZ5TG5ObGRFUmhkR0VvSjFSbGVIUW5MQ0FuWjI5emRTY3BPMXh5WEc0Z0lGeDBYSFJjZEZ4MGZTazdYSEpjYmx4MFhIUmNkRngwYzJOdmNHVXVKSFJ5WVc1elkyeDFaR1ZHYmlBOUlIUnlZVzV6WTJ4MVpHVTdYSFJjZEZ4MFhISmNibHgwWEhSY2RIMWNjbHh1WEhSY2RIMWNjbHh1SUNBZ0lDQWdmVHRjY2x4dUlDQjlLVHRjY2x4dVhISmNibTF2WkhWc1pTNWthWEpsWTNScGRtVW9KM0JoYm1WRFlYQjBhVzl1VkhKaGJuTmpiSFZrWlNjc0lHWjFibU4wYVc5dUtDa2dlMXh5WEc0Z0lISmxkSFZ5YmlCN1hISmNiaUFnSUNCeVpYTjBjbWxqZERvZ0owRW5MRnh5WEc0Z0lDQWdjbVZ4ZFdseVpUb2dKMTV3WVc1bEp5eGNjbHh1SUNBZ0lHeHBibXM2SUdaMWJtTjBhVzl1S0hOamIzQmxMQ0JsYkcwc0lHRjBkSEp6TENCMFlXSkRkSEpzS1NCN1hISmNiaUFnSUNBZ0lITmpiM0JsTGlSM1lYUmphQ2duWTJGd2RHbHZia1ZzWlcxbGJuUW5MQ0JtZFc1amRHbHZiaUIxY0dSaGRHVklaV0ZrYVc1blJXeGxiV1Z1ZENoallYQjBhVzl1S1NCN1hISmNiaUFnSUNBZ0lDQWdhV1lnS0dOaGNIUnBiMjRwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJR1ZzYlM1b2RHMXNLQ2NuS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJR1ZzYlM1aGNIQmxibVFvWTJGd2RHbHZiaWs3WEhKY2JpQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQjlLVHRjY2x4dUlDQWdJSDFjY2x4dUlDQjlPMXh5WEc1OUtUdGNjbHh1WEhKY2JtMXZaSFZzWlM1a2FYSmxZM1JwZG1Vb0ozQmhibVZEYjI1MFpXNTBWSEpoYm5OamJIVmtaU2NzSUdaMWJtTjBhVzl1S0NrZ2UxeHlYRzRnSUhKbGRIVnliaUI3WEhKY2JpQWdJQ0J5WlhOMGNtbGpkRG9nSjBFbkxGeHlYRzRnSUNBZ2NtVnhkV2x5WlRvZ0oxNTNhVzVrYjNjbkxGeHlYRzRnSUNBZ2JHbHVhem9nWm5WdVkzUnBiMjRvYzJOdmNHVXNJR1ZzYlN3Z1lYUjBjbk1wSUh0Y2NseHVJQ0FnSUNBZ2RtRnlJSEJoYm1VZ1BTQnpZMjl3WlM0a1pYWmhiQ2hoZEhSeWN5NXdZVzVsUTI5dWRHVnVkRlJ5WVc1elkyeDFaR1VwTzF4eVhHNGdJQ0FnSUNCelkyOXdaUzVwWkNBOUlIQmhibVV1YVdRN1hISmNibHh5WEc0Z0lDQWdJQ0F2TDA1dmR5QnZkWElnZEdGaUlHbHpJSEpsWVdSNUlIUnZJR0psSUhSeVlXNXpZMngxWkdWa09pQmliM1JvSUhSb1pTQjBZV0lnYUdWaFpHbHVaeUJoY21WaFhISmNiaUFnSUNBZ0lDOHZZVzVrSUhSb1pTQjBZV0lnWTI5dWRHVnVkQ0JoY21WaElHRnlaU0JzYjJGa1pXUXVJQ0JVY21GdWMyTnNkV1JsSUNkbGJTQmliM1JvTGx4eVhHNGdJQ0FnSUNCd1lXNWxMaVIwY21GdWMyTnNkV1JsUm00b2NHRnVaUzRrY0dGeVpXNTBMQ0JtZFc1amRHbHZiaWhqYjI1MFpXNTBjeWtnZTF4eVhHNGdJQ0FnSUNBZ0lHRnVaM1ZzWVhJdVptOXlSV0ZqYUNoamIyNTBaVzUwY3l3Z1puVnVZM1JwYjI0b2JtOWtaU2tnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdhV1lnS0dselVHRnVaVU5oY0hScGIyNG9ibTlrWlNrcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OU1aWFFnZEdGaVNHVmhaR2x1WjFSeVlXNXpZMngxWkdVZ2EyNXZkeTVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdjR0Z1WlM1allYQjBhVzl1Uld4bGJXVnVkQ0E5SUc1dlpHVTdYSEpjYmlBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JsYkcwdVlYQndaVzVrS0c1dlpHVXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJSDBwTzF4eVhHNGdJQ0FnSUNCOUtUdGNjbHh1SUNBZ0lIMWNjbHh1SUNCOU8xeHlYRzRnSUdaMWJtTjBhVzl1SUdselVHRnVaVU5oY0hScGIyNG9ibTlrWlNrZ2UxeHlYRzRnSUNBZ2NtVjBkWEp1SUc1dlpHVXVkR0ZuVG1GdFpTQW1KaUFnS0Z4eVhHNGdJQ0FnSUNCdWIyUmxMbWhoYzBGMGRISnBZblYwWlNnbmNHRnVaUzFqWVhCMGFXOXVKeWtnZkh4Y2NseHVJQ0FnSUNBZ2JtOWtaUzVvWVhOQmRIUnlhV0oxZEdVb0oyUmhkR0V0Y0dGdVpTMWpZWEIwYVc5dUp5a2dmSHhjY2x4dUlDQWdJQ0FnYm05a1pTNTBZV2RPWVcxbExuUnZURzkzWlhKRFlYTmxLQ2tnUFQwOUlDZHdZVzVsTFdOaGNIUnBiMjRuSUh4OFhISmNiaUFnSUNBZ0lHNXZaR1V1ZEdGblRtRnRaUzUwYjB4dmQyVnlRMkZ6WlNncElEMDlQU0FuWkdGMFlTMXdZVzVsTFdOaGNIUnBiMjRuWEhKY2JpQWdJQ0FwTzF4eVhHNGdJSDFjY2x4dWZTazdYSEpjYmlKZGZRPT0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgYW5ndWxhciA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Wydhbmd1bGFyJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydhbmd1bGFyJ10gOiBudWxsKTtcclxudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCd1aS53aW53aW4nKTtcclxuXHJcbm1vZHVsZS5kaXJlY3RpdmUoJ3VpVHJhbnNjbHVkZScsIFsnJGxvZycsIGZ1bmN0aW9uICgkbG9nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgXCJyZXN0cmljdFwiOiBcIkFcIixcclxuICAgICAgICBcImxpbmtcIjogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycywgbnVsbEN0cmwsIHRyYW5zY2x1ZGVGbikge1xyXG4gICAgICAgICAgICB2YXIgZWxTY29wZSA9IGVsZW1lbnQuc2NvcGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRyYW5zY2x1ZGVGbihlbFNjb3BlLCBmdW5jdGlvbiAoY2xvbmUpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGNsb25lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufV0pO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbXhwWWk5MGNtRnVjMk5zZFdSbExtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpZG1GeUlHRnVaM1ZzWVhJZ1BTQW9kSGx3Wlc5bUlIZHBibVJ2ZHlBaFBUMGdYQ0oxYm1SbFptbHVaV1JjSWlBL0lIZHBibVJ2ZDFzbllXNW5kV3hoY2lkZElEb2dkSGx3Wlc5bUlHZHNiMkpoYkNBaFBUMGdYQ0oxYm1SbFptbHVaV1JjSWlBL0lHZHNiMkpoYkZzbllXNW5kV3hoY2lkZElEb2diblZzYkNrN1hISmNiblpoY2lCdGIyUjFiR1VnUFNCaGJtZDFiR0Z5TG0xdlpIVnNaU2duZFdrdWQybHVkMmx1SnlrN1hISmNibHh5WEc1dGIyUjFiR1V1WkdseVpXTjBhWFpsS0NkMWFWUnlZVzV6WTJ4MVpHVW5MQ0JiSnlSc2IyY25MQ0JtZFc1amRHbHZiaUFvSkd4dlp5a2dlMXh5WEc0Z0lDQWdYQ0oxYzJVZ2MzUnlhV04wWENJN1hISmNiaUFnSUNCeVpYUjFjbTRnZTF4eVhHNGdJQ0FnSUNBZ0lGd2ljbVZ6ZEhKcFkzUmNJam9nWENKQlhDSXNYSEpjYmlBZ0lDQWdJQ0FnWENKc2FXNXJYQ0k2SUdaMWJtTjBhVzl1SUNoelkyOXdaU3dnWld4bGJXVnVkQ3dnWVhSMGNuTXNJRzUxYkd4RGRISnNMQ0IwY21GdWMyTnNkV1JsUm00cElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR1ZzVTJOdmNHVWdQU0JsYkdWdFpXNTBMbk5qYjNCbEtDazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IwY21GdWMyTnNkV1JsUm00b1pXeFRZMjl3WlN3Z1puVnVZM1JwYjI0Z0tHTnNiMjVsS1NCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxiR1Z0Wlc1MExtRndjR1Z1WkNoamJHOXVaU2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDBwTzF4eVhHNGdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lIMDdYSEpjYm4xZEtUc2lYWDA9IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snYW5ndWxhciddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnYW5ndWxhciddIDogbnVsbCk7XHJcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgndWkud2lud2luJyk7XHJcblxyXG53aW5kb3dDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xyXG5cclxuZnVuY3Rpb24gd2luZG93Q29udHJvbGxlcigkc2NvcGUpIHtcclxuXHR2YXIgY3RybCA9IHRoaXM7XHJcblx0dmFyIHBhbmVzID0gY3RybC5wYW5lcyA9ICRzY29wZS5wYW5lcyA9IFtdO1xyXG5cdGN0cmwuc2VsZWN0ID0gZnVuY3Rpb24oc2VsZWN0ZWRQYW5lKSB7XHJcblx0XHRhbmd1bGFyLmZvckVhY2gocGFuZXMsIGZ1bmN0aW9uKHBhbmUpIHtcclxuXHRcdFx0aWYocGFuZS5hY3RpdmUgJiYgcGFuZSAhPT0gc2VsZWN0ZWRQYW5lKSB7XHJcblx0XHRcdFx0cGFuZS5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRwYW5lLm9uRGVzZWxlY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRzZWxlY3RlZFBhbmUuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdHNlbGVjdGVkUGFuZS5vblNlbGVjdCgpO1xyXG5cdH1cclxuXHJcblx0Y3RybC5hZGRQYW5lID0gZnVuY3Rpb24ocGFuZSkge1xyXG5cdFx0cGFuZXMucHVzaChwYW5lKTtcclxuXHRcdGlmKHBhbmVzLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRjdHJsLnNlbGVjdChwYW5lKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y3RybC5yZW1vdmVQYW5lID0gZnVuY3Rpb24ocGFuZSkge1xyXG5cdFx0dmFyIGluZGV4ID0gcGFuZXMuaW5kZXhPZihwYW5lKTtcclxuXHRcdHBhbmVzLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHRpZihwYW5lcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGN0cmwuc2VsZWN0KHBhbmVzWzBdKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y3RybC5jcmVhdGVQYW5lID0gZnVuY3Rpb24oY2FwdGlvbiwgY29udGVudCkge1xyXG5cdFx0XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuY29udHJvbGxlcignV2luZG93Q29udHJvbGxlcicsIHdpbmRvd0NvbnRyb2xsZXIpO1xyXG5cclxuLy9cclxuXHJcbm1vZHVsZS5kaXJlY3RpdmUoJ3dpbmRvdycsIGZ1bmN0aW9uICgkY29tcGlsZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG5cdFx0cmVzdHJpY3Q6ICdFJyxcclxuXHRcdHJlcGxhY2U6IHRydWUsXHJcblx0XHR0cmFuc2NsdWRlOiB0cnVlLFxyXG5cdFx0cmVxdWlyZTond2luZG93JyxcclxuXHRcdHNjb3BlOiB7XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cIndpbmRvd1wiPjxkaXYgY2xhc3M9XCJ3aW5kb3ctaGVhZGVyXCIgdWktdHJhbnNjbHVkZT48L2Rpdj48ZGl2IGNsYXNzPVwid2luZG93LWNvbnRlbnRcIj48ZGl2IG5nLXJlcGVhdD1cInBhbmUgaW4gcGFuZXNcIiBuZy1zaG93PVwicGFuZS5hY3RpdmVcIiBwYW5lLWNvbnRlbnQtdHJhbnNjbHVkZT1cInBhbmVcIiBpZD1cInt7aWR9fS1jb250ZW50XCI+PC9kaXY+PC9kaXY+JyxcclxuXHRcdGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuXHRcdGNvbnRyb2xsZXI6ICdXaW5kb3dDb250cm9sbGVyJyxcclxuXHRcdGxpbms6ICBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0ciwgd2luZG93Q29udHJvbGxlcikge1xyXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdGZ1bmN0aW9uIGNyZWF0ZVBhbmUoY2FwdGlvbikge1xyXG5cdFx0XHRcdFx0dmFyIG5ld1BhbmUgPSAkKCc8cGFuZSBjYXB0aW9uPVwiJytjYXB0aW9uKydcIj48L3BhbmU+Jyk7XHJcblx0XHRcdFx0XHR2YXIgY2hpbGRTY29wZSA9IHNjb3BlLiRuZXcodHJ1ZSk7XHJcblx0XHRcdFx0XHQkY29tcGlsZShuZXdQYW5lKShjaGlsZFNjb3BlLCB1bmRlZmluZWQsIHt3aW5kb3c6IHdpbmRvd0N9KTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3UGFuZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHNwbGl0QXJlYSA9ICQoJ2JvZHknKS5jaGlsZHJlbignLnNwbGl0ZHJvcGFyZWEnKTtcclxuXHRcdFx0aWYoIXNwbGl0QXJlYS5sZW5ndGgpIHtcclxuXHRcdFx0XHRzcGxpdEFyZWEgPSAkKCc8ZGl2IGNsYXNzPVwic3BsaXRkcm9wYXJlYVwiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPjwvZGl2PicpO1xyXG5cdFx0XHRcdHNwbGl0QXJlYS5hcHBlbmRUbygkKCdib2R5JykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBoZWFkZXJDb250YWluZXIgPSBlbGVtZW50LmNoaWxkcmVuKCcud2luZG93LWhlYWRlcicpO1xyXG5cdFx0XHR2YXIgY29udGFpbmVyID0gZWxlbWVudC5jaGlsZHJlbignLndpbmRvdy1jb250ZW50Jyk7XHJcblxyXG5cdFx0XHRjb250YWluZXIuYmluZCgnZHJvcCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0dmFyIHBhbmVJZCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2FwcGxpY2F0aW9uL3gtbHgtd2luZG93LXBhbmUnKTtcclxuXHRcdFx0XHR2YXIgYXJlYSA9IGdldEFyZWFGcm9tRXZlbnQoZXZlbnQpO1xyXG5cdFx0XHRcdHZhciBzb3VyY2VQYW5lID0gJCgnIycrIHBhbmVJZCk7XHJcblx0XHRcdFx0dmFyIHNvdXJjZUNvbnRlbnRQYW5lID0gJCgnIycrIHBhbmVJZCtcIi1jb250ZW50XCIpO1xyXG5cclxuXHRcdFx0XHR2YXIgc2NwID0gYW5ndWxhci5lbGVtZW50KHNvdXJjZUNvbnRlbnRQYW5lKS5zY29wZSgpLnBhbmU7XHJcblx0XHRcdFx0dmFyIG5ld1BhbmUgPSBhbmd1bGFyLmVsZW1lbnQoJzxwYW5lIGNhcHRpb249XCInICsgc2NwLmNhcHRpb24gKyAnXCI+PC9wYW5lPicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdG5ld1BhbmUuYXBwZW5kKHNvdXJjZUNvbnRlbnRQYW5lLmNvbnRlbnRzKCkpO1xyXG5cdFx0XHRcdG5ld1BhbmUuYXBwZW5kVG8oaGVhZGVyQ29udGFpbmVyKTtcclxuXHRcdFx0XHQkY29tcGlsZShuZXdQYW5lKShzY29wZS4kbmV3KHRydWUpLCB1bmRlZmluZWQsIHt3aW5kb3c6d2luZG93Q29udHJvbGxlcn0pO1xyXG5cdFx0XHRcdHNjcC4kZGVzdHJveSgpO1xyXG5cdFx0XHRcdHNvdXJjZVBhbmUucmVtb3ZlKCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRzcGxpdEFyZWEuaGlkZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0ZWxlbWVudC5iaW5kKCdkcmFnZW5kJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRzcGxpdEFyZWEuaGlkZSgpO1xyXG5cdFx0XHRcdC8vc3VjY2Vzc2Z1bGx5IGRyb3BwZWQ/XHJcblx0XHRcdFx0aWYoZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCAhPT0gJ25vbmUnKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnZHJvcHBlZCBzdWNjZXNzZnVsbHknKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjb250YWluZXIuYmluZCgnZHJhZ2VudGVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRmb3IodmFyIGk9MDtpPGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzLmxlbmd0aDtpKyspIHtcclxuXHRcdFx0XHRcdHZhciB0eXBlID0gZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIudHlwZXNbaV07XHJcblx0XHRcdFx0XHRpZih0eXBlPT09J2FwcGxpY2F0aW9uL3gtbHgtd2luZG93LXBhbmUnKSB7XHJcblx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHRzcGxpdEFyZWEuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9IFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRjb250YWluZXIuYmluZCgnZHJhZ2xlYXZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Y29udGFpbmVyLmJpbmQoJ2RyYWdvdmVyJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHR2YXIgZm91bmQgPSBmYWxzZTtcclxuXHRcdFx0XHRmb3IodmFyIGk9MDtpPGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzLmxlbmd0aDtpKyspIHtcclxuXHRcdFx0XHRcdHZhciB0eXBlID0gZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIudHlwZXNbaV07XHJcblx0XHRcdFx0XHRpZih0eXBlPT09J2FwcGxpY2F0aW9uL3gtbHgtd2luZG93LXBhbmUnKSB7XHJcblx0XHRcdFx0XHRcdGZvdW5kID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9IFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoIWZvdW5kKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0dmFyIHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblx0XHRcdFx0dmFyIGJvdW5kcyA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcdFx0XHRcdFxyXG5cdFx0XHRcdHZhciBoZWlnaHQgPSBib3VuZHMuYm90dG9tIC0gYm91bmRzLnRvcDtcclxuXHRcdFx0XHR2YXIgd2lkdGggPSBib3VuZHMucmlnaHQgLSBib3VuZHMubGVmdDtcclxuXHJcblx0XHRcdFx0dmFyIG9mZnNldCA9IGNvbnRhaW5lci5vZmZzZXQoKTtcclxuXHRcdFx0XHR2YXIgYXJlYSA9IGdldEFyZWFGcm9tRXZlbnQoZXZlbnQpO1xyXG5cdFx0XHRcdHN3aXRjaChhcmVhKSB7XHJcblx0XHRcdFx0XHRjYXNlIEFSRUFTLlRPUDpcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLm9mZnNldCh7dG9wOm9mZnNldC50b3AsIGxlZnQ6b2Zmc2V0LmxlZnR9KTtcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLndpZHRoKHdpZHRoKTtcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLmhlaWdodChoZWlnaHQvMik7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1x0XHJcblx0XHRcdFx0XHRjYXNlIEFSRUFTLlJJR0hUOlxyXG5cdFx0XHRcdFx0XHRzcGxpdEFyZWEub2Zmc2V0KHt0b3A6b2Zmc2V0LnRvcCwgbGVmdDpvZmZzZXQubGVmdCt3aWR0aC8yfSk7XHJcblx0XHRcdFx0XHRcdHNwbGl0QXJlYS53aWR0aCh3aWR0aC8yKTtcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLmhlaWdodChoZWlnaHQpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgQVJFQVMuTEVGVDpcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLm9mZnNldCh7dG9wOm9mZnNldC50b3AsIGxlZnQ6b2Zmc2V0LmxlZnR9KTtcclxuXHRcdFx0XHRcdFx0c3BsaXRBcmVhLndpZHRoKHdpZHRoLzIpO1xyXG5cdFx0XHRcdFx0XHRzcGxpdEFyZWEuaGVpZ2h0KGhlaWdodCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSBBUkVBUy5CT1RUT006XHJcblx0XHRcdFx0XHRcdHNwbGl0QXJlYS5vZmZzZXQoe3RvcDpvZmZzZXQudG9wK2hlaWdodC8yLCBsZWZ0Om9mZnNldC5sZWZ0fSk7XHJcblx0XHRcdFx0XHRcdHNwbGl0QXJlYS53aWR0aCh3aWR0aCk7XHJcblx0XHRcdFx0XHRcdHNwbGl0QXJlYS5oZWlnaHQoaGVpZ2h0LzIpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG4gICAgICB9O1xyXG4gIH0pO1xyXG5cclxudmFyIEFSRUFTID0ge1xyXG5cdFRPUDondG9wJywgXHJcblx0TEVGVDonbGVmdCcsIFxyXG5cdFJJR0hUOidyaWdodCcsIFxyXG5cdEJPVFRPTTonYm90dG9tJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBcmVhRnJvbUV2ZW50KGV2ZW50KSB7XHJcblx0dmFyIHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblx0dmFyIGJvdW5kcyA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcdFx0XHRcdFxyXG5cclxuICAgIHZhciBwb3NZID0gZXZlbnQub3JpZ2luYWxFdmVudC5jbGllbnRZIC0gYm91bmRzLnRvcDtcclxuICAgIHZhciBwb3NYID0gZXZlbnQub3JpZ2luYWxFdmVudC5jbGllbnRYIC0gYm91bmRzLmxlZnQ7XHJcbiAgICByZXR1cm4gZ2V0QXJlYShib3VuZHMsIHBvc1gsIHBvc1kpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QXJlYShib3VuZHMsIHBvc1gsIHBvc1kpIHtcclxuXHR2YXIgaGVpZ2h0ID0gYm91bmRzLmJvdHRvbSAtIGJvdW5kcy50b3A7XHJcblx0dmFyIHdpZHRoID0gYm91bmRzLnJpZ2h0IC0gYm91bmRzLmxlZnQ7XHJcblx0dmFyIHBjdFkgPSBwb3NZL2hlaWdodDtcclxuXHR2YXIgcGN0WCA9IHBvc1gvd2lkdGg7XHJcblx0Ly9jYWxjdWxhdGUgc2xvcGVzXHJcblx0dmFyIG9BRCA9IHBjdFgvcGN0WT4xO1xyXG5cdHZhciBvQ0IgPSBwY3RYLygxLXBjdFkpPD0xO1xyXG5cdGlmKG9BRCkge1xyXG5cdFx0aWYob0NCKSB7XHJcblx0XHRcdHJldHVybiBBUkVBUy5UT1A7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gQVJFQVMuUklHSFQ7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmKG9DQikge1xyXG5cdFx0XHRyZXR1cm4gQVJFQVMuTEVGVDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBBUkVBUy5CT1RUT007XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbXhwWWk5M2FXNWtiM2N1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lkbUZ5SUdGdVozVnNZWElnUFNBb2RIbHdaVzltSUhkcGJtUnZkeUFoUFQwZ1hDSjFibVJsWm1sdVpXUmNJaUEvSUhkcGJtUnZkMXNuWVc1bmRXeGhjaWRkSURvZ2RIbHdaVzltSUdkc2IySmhiQ0FoUFQwZ1hDSjFibVJsWm1sdVpXUmNJaUEvSUdkc2IySmhiRnNuWVc1bmRXeGhjaWRkSURvZ2JuVnNiQ2s3WEhKY2JuWmhjaUJ0YjJSMWJHVWdQU0JoYm1kMWJHRnlMbTF2WkhWc1pTZ25kV2t1ZDJsdWQybHVKeWs3WEhKY2JseHlYRzUzYVc1a2IzZERiMjUwY205c2JHVnlMaVJwYm1wbFkzUWdQU0JiSnlSelkyOXdaU2RkTzF4eVhHNWNjbHh1Wm5WdVkzUnBiMjRnZDJsdVpHOTNRMjl1ZEhKdmJHeGxjaWdrYzJOdmNHVXBJSHRjY2x4dVhIUjJZWElnWTNSeWJDQTlJSFJvYVhNN1hISmNibHgwZG1GeUlIQmhibVZ6SUQwZ1kzUnliQzV3WVc1bGN5QTlJQ1J6WTI5d1pTNXdZVzVsY3lBOUlGdGRPMXh5WEc1Y2RHTjBjbXd1YzJWc1pXTjBJRDBnWm5WdVkzUnBiMjRvYzJWc1pXTjBaV1JRWVc1bEtTQjdYSEpjYmx4MFhIUmhibWQxYkdGeUxtWnZja1ZoWTJnb2NHRnVaWE1zSUdaMWJtTjBhVzl1S0hCaGJtVXBJSHRjY2x4dVhIUmNkRngwYVdZb2NHRnVaUzVoWTNScGRtVWdKaVlnY0dGdVpTQWhQVDBnYzJWc1pXTjBaV1JRWVc1bEtTQjdYSEpjYmx4MFhIUmNkRngwY0dGdVpTNWhZM1JwZG1VZ1BTQm1ZV3h6WlR0Y2NseHVYSFJjZEZ4MFhIUndZVzVsTG05dVJHVnpaV3hsWTNRb0tUdGNjbHh1WEhSY2RGeDBmVnh5WEc1Y2RGeDBmU2s3WEhKY2JseDBYSFJ6Wld4bFkzUmxaRkJoYm1VdVlXTjBhWFpsSUQwZ2RISjFaVHRjY2x4dVhIUmNkSE5sYkdWamRHVmtVR0Z1WlM1dmJsTmxiR1ZqZENncE8xeHlYRzVjZEgxY2NseHVYSEpjYmx4MFkzUnliQzVoWkdSUVlXNWxJRDBnWm5WdVkzUnBiMjRvY0dGdVpTa2dlMXh5WEc1Y2RGeDBjR0Z1WlhNdWNIVnphQ2h3WVc1bEtUdGNjbHh1WEhSY2RHbG1LSEJoYm1WekxteGxibWQwYUNBOVBUMGdNU2tnZTF4eVhHNWNkRngwWEhSamRISnNMbk5sYkdWamRDaHdZVzVsS1R0Y2NseHVYSFJjZEgxY2NseHVYSFI5WEhKY2JseDBZM1J5YkM1eVpXMXZkbVZRWVc1bElEMGdablZ1WTNScGIyNG9jR0Z1WlNrZ2UxeHlYRzVjZEZ4MGRtRnlJR2x1WkdWNElEMGdjR0Z1WlhNdWFXNWtaWGhQWmlod1lXNWxLVHRjY2x4dVhIUmNkSEJoYm1WekxuTndiR2xqWlNocGJtUmxlQ3dnTVNrN1hISmNibHgwWEhScFppaHdZVzVsY3k1c1pXNW5kR2dnUGlBd0tTQjdYSEpjYmx4MFhIUmNkR04wY213dWMyVnNaV04wS0hCaGJtVnpXekJkS1R0Y2NseHVYSFJjZEgxY2NseHVYSFI5WEhKY2JseDBZM1J5YkM1amNtVmhkR1ZRWVc1bElEMGdablZ1WTNScGIyNG9ZMkZ3ZEdsdmJpd2dZMjl1ZEdWdWRDa2dlMXh5WEc1Y2RGeDBYSEpjYmx4MGZWeHlYRzU5WEhKY2JseHlYRzV0YjJSMWJHVXVZMjl1ZEhKdmJHeGxjaWduVjJsdVpHOTNRMjl1ZEhKdmJHeGxjaWNzSUhkcGJtUnZkME52Ym5SeWIyeHNaWElwTzF4eVhHNWNjbHh1THk5Y2NseHVYSEpjYm0xdlpIVnNaUzVrYVhKbFkzUnBkbVVvSjNkcGJtUnZkeWNzSUdaMWJtTjBhVzl1SUNna1kyOXRjR2xzWlNrZ2UxeHlYRzRnSUNBZ0lDQnlaWFIxY200Z2UxeHlYRzVjZEZ4MGNtVnpkSEpwWTNRNklDZEZKeXhjY2x4dVhIUmNkSEpsY0d4aFkyVTZJSFJ5ZFdVc1hISmNibHgwWEhSMGNtRnVjMk5zZFdSbE9pQjBjblZsTEZ4eVhHNWNkRngwY21WeGRXbHlaVG9uZDJsdVpHOTNKeXhjY2x4dVhIUmNkSE5qYjNCbE9pQjdYSEpjYmx4MFhIUmNkRnh5WEc1Y2RGeDBmU3hjY2x4dVhIUmNkSFJsYlhCc1lYUmxPaUFuUEdScGRpQmpiR0Z6Y3oxY0luZHBibVJ2ZDF3aVBqeGthWFlnWTJ4aGMzTTlYQ0ozYVc1a2IzY3RhR1ZoWkdWeVhDSWdkV2t0ZEhKaGJuTmpiSFZrWlQ0OEwyUnBkajQ4WkdsMklHTnNZWE56UFZ3aWQybHVaRzkzTFdOdmJuUmxiblJjSWo0OFpHbDJJRzVuTFhKbGNHVmhkRDFjSW5CaGJtVWdhVzRnY0dGdVpYTmNJaUJ1WnkxemFHOTNQVndpY0dGdVpTNWhZM1JwZG1WY0lpQndZVzVsTFdOdmJuUmxiblF0ZEhKaGJuTmpiSFZrWlQxY0luQmhibVZjSWlCcFpEMWNJbnQ3YVdSOWZTMWpiMjUwWlc1MFhDSStQQzlrYVhZK1BDOWthWFkrSnl4Y2NseHVYSFJjZEdOdmJuUnliMnhzWlhKQmN6b2dKM1p0Snl4Y2NseHVYSFJjZEdOdmJuUnliMnhzWlhJNklDZFhhVzVrYjNkRGIyNTBjbTlzYkdWeUp5eGNjbHh1WEhSY2RHeHBibXM2SUNCbWRXNWpkR2x2YmloelkyOXdaU3dnWld4bGJXVnVkQ3dnWVhSMGNpd2dkMmx1Wkc5M1EyOXVkSEp2Ykd4bGNpa2dlMXh5WEc1Y2RGeDBYSFIyWVhJZ2MyVnNaaUE5SUhSb2FYTTdYSEpjYmx4MFhIUmNkR1oxYm1OMGFXOXVJR055WldGMFpWQmhibVVvWTJGd2RHbHZiaWtnZTF4eVhHNWNkRngwWEhSY2RGeDBkbUZ5SUc1bGQxQmhibVVnUFNBa0tDYzhjR0Z1WlNCallYQjBhVzl1UFZ3aUp5dGpZWEIwYVc5dUt5ZGNJajQ4TDNCaGJtVStKeWs3WEhKY2JseDBYSFJjZEZ4MFhIUjJZWElnWTJocGJHUlRZMjl3WlNBOUlITmpiM0JsTGlSdVpYY29kSEoxWlNrN1hISmNibHgwWEhSY2RGeDBYSFFrWTI5dGNHbHNaU2h1WlhkUVlXNWxLU2hqYUdsc1pGTmpiM0JsTENCMWJtUmxabWx1WldRc0lIdDNhVzVrYjNjNklIZHBibVJ2ZDBOOUtUdGNkRngwWEhSY2RGeDBYSEpjYmx4MFhIUmNkRngwWEhSeVpYUjFjbTRnYm1WM1VHRnVaVHRjY2x4dVhIUmNkRngwZlZ4eVhHNWNjbHh1WEhSY2RGeDBkbUZ5SUhOd2JHbDBRWEpsWVNBOUlDUW9KMkp2WkhrbktTNWphR2xzWkhKbGJpZ25Mbk53YkdsMFpISnZjR0Z5WldFbktUdGNjbHh1WEhSY2RGeDBhV1lvSVhOd2JHbDBRWEpsWVM1c1pXNW5kR2dwSUh0Y2NseHVYSFJjZEZ4MFhIUnpjR3hwZEVGeVpXRWdQU0FrS0NjOFpHbDJJR05zWVhOelBWd2ljM0JzYVhSa2NtOXdZWEpsWVZ3aUlITjBlV3hsUFZ3aVpHbHpjR3hoZVRwdWIyNWxPMXdpUGp3dlpHbDJQaWNwTzF4eVhHNWNkRngwWEhSY2RITndiR2wwUVhKbFlTNWhjSEJsYm1SVWJ5Z2tLQ2RpYjJSNUp5a3BPMXh5WEc1Y2RGeDBYSFI5WEhKY2JseDBYSFJjZEhaaGNpQm9aV0ZrWlhKRGIyNTBZV2x1WlhJZ1BTQmxiR1Z0Wlc1MExtTm9hV3hrY21WdUtDY3VkMmx1Wkc5M0xXaGxZV1JsY2ljcE8xeHlYRzVjZEZ4MFhIUjJZWElnWTI5dWRHRnBibVZ5SUQwZ1pXeGxiV1Z1ZEM1amFHbHNaSEpsYmlnbkxuZHBibVJ2ZHkxamIyNTBaVzUwSnlrN1hISmNibHh5WEc1Y2RGeDBYSFJqYjI1MFlXbHVaWEl1WW1sdVpDZ25aSEp2Y0Njc0lHWjFibU4wYVc5dUtHVjJaVzUwS1NCN1hISmNibHgwWEhSY2RGeDBkbUZ5SUhCaGJtVkpaQ0E5SUdWMlpXNTBMbTl5YVdkcGJtRnNSWFpsYm5RdVpHRjBZVlJ5WVc1elptVnlMbWRsZEVSaGRHRW9KMkZ3Y0d4cFkyRjBhVzl1TDNndGJIZ3RkMmx1Wkc5M0xYQmhibVVuS1R0Y2NseHVYSFJjZEZ4MFhIUjJZWElnWVhKbFlTQTlJR2RsZEVGeVpXRkdjbTl0UlhabGJuUW9aWFpsYm5RcE8xeHlYRzVjZEZ4MFhIUmNkSFpoY2lCemIzVnlZMlZRWVc1bElEMGdKQ2duSXljcklIQmhibVZKWkNrN1hISmNibHgwWEhSY2RGeDBkbUZ5SUhOdmRYSmpaVU52Ym5SbGJuUlFZVzVsSUQwZ0pDZ25JeWNySUhCaGJtVkpaQ3RjSWkxamIyNTBaVzUwWENJcE8xeHlYRzVjY2x4dVhIUmNkRngwWEhSMllYSWdjMk53SUQwZ1lXNW5kV3hoY2k1bGJHVnRaVzUwS0hOdmRYSmpaVU52Ym5SbGJuUlFZVzVsS1M1elkyOXdaU2dwTG5CaGJtVTdYSEpjYmx4MFhIUmNkRngwZG1GeUlHNWxkMUJoYm1VZ1BTQmhibWQxYkdGeUxtVnNaVzFsYm5Rb0p6eHdZVzVsSUdOaGNIUnBiMjQ5WENJbklDc2djMk53TG1OaGNIUnBiMjRnS3lBblhDSStQQzl3WVc1bFBpY3BPMXh5WEc1Y2RGeDBYSFJjZEZ4eVhHNWNkRngwWEhSY2RHNWxkMUJoYm1VdVlYQndaVzVrS0hOdmRYSmpaVU52Ym5SbGJuUlFZVzVsTG1OdmJuUmxiblJ6S0NrcE8xeHlYRzVjZEZ4MFhIUmNkRzVsZDFCaGJtVXVZWEJ3Wlc1a1ZHOG9hR1ZoWkdWeVEyOXVkR0ZwYm1WeUtUdGNjbHh1WEhSY2RGeDBYSFFrWTI5dGNHbHNaU2h1WlhkUVlXNWxLU2h6WTI5d1pTNGtibVYzS0hSeWRXVXBMQ0IxYm1SbFptbHVaV1FzSUh0M2FXNWtiM2M2ZDJsdVpHOTNRMjl1ZEhKdmJHeGxjbjBwTzF4eVhHNWNkRngwWEhSY2RITmpjQzRrWkdWemRISnZlU2dwTzF4eVhHNWNkRngwWEhSY2RITnZkWEpqWlZCaGJtVXVjbVZ0YjNabEtDazdYSEpjYmx4MFhIUmNkRngwWlhabGJuUXVjM1J2Y0ZCeWIzQmhaMkYwYVc5dUtDazdYSEpjYmx4MFhIUmNkRngwWlhabGJuUXVjSEpsZG1WdWRFUmxabUYxYkhRb0tUdGNjbHh1WEhSY2RGeDBYSFJ6Y0d4cGRFRnlaV0V1YUdsa1pTZ3BPMXh5WEc1Y2RGeDBYSFI5S1R0Y2NseHVYSFJjZEZ4MFpXeGxiV1Z1ZEM1aWFXNWtLQ2RrY21GblpXNWtKeXdnWm5WdVkzUnBiMjRvWlhabGJuUXBJSHRjY2x4dVhIUmNkRngwWEhSemNHeHBkRUZ5WldFdWFHbGtaU2dwTzF4eVhHNWNkRngwWEhSY2RDOHZjM1ZqWTJWemMyWjFiR3g1SUdSeWIzQndaV1EvWEhKY2JseDBYSFJjZEZ4MGFXWW9aWFpsYm5RdWIzSnBaMmx1WVd4RmRtVnVkQzVrWVhSaFZISmhibk5tWlhJdVpISnZjRVZtWm1WamRDQWhQVDBnSjI1dmJtVW5LU0I3WEhKY2JseDBYSFJjZEZ4MFhIUmpiMjV6YjJ4bExteHZaeWduWkhKdmNIQmxaQ0J6ZFdOalpYTnpablZzYkhrbktUdGNjbHh1WEhSY2RGeDBYSFI5WEhKY2JseDBYSFJjZEgwcE8xeHlYRzVjZEZ4MFhIUmpiMjUwWVdsdVpYSXVZbWx1WkNnblpISmhaMlZ1ZEdWeUp5d2dablZ1WTNScGIyNG9aWFpsYm5RcElIdGNjbHh1WEhSY2RGeDBYSFJtYjNJb2RtRnlJR2s5TUR0cFBHVjJaVzUwTG05eWFXZHBibUZzUlhabGJuUXVaR0YwWVZSeVlXNXpabVZ5TG5SNWNHVnpMbXhsYm1kMGFEdHBLeXNwSUh0Y2NseHVYSFJjZEZ4MFhIUmNkSFpoY2lCMGVYQmxJRDBnWlhabGJuUXViM0pwWjJsdVlXeEZkbVZ1ZEM1a1lYUmhWSEpoYm5ObVpYSXVkSGx3WlhOYmFWMDdYSEpjYmx4MFhIUmNkRngwWEhScFppaDBlWEJsUFQwOUoyRndjR3hwWTJGMGFXOXVMM2d0YkhndGQybHVaRzkzTFhCaGJtVW5LU0I3WEhKY2JseDBYSFJjZEZ4MFhIUmNkR1YyWlc1MExuTjBiM0JRY205d1lXZGhkR2x2YmlncE8xeHlYRzVjZEZ4MFhIUmNkRngwWEhSemNHeHBkRUZ5WldFdWMyaHZkeWdwTzF4eVhHNWNkRngwWEhSY2RGeDBYSFJ5WlhSMWNtNDdYSEpjYmx4MFhIUmNkRngwWEhSOUlGeHlYRzVjZEZ4MFhIUmNkSDFjY2x4dVhIUmNkRngwZlNrN1hISmNibHh5WEc1Y2RGeDBYSFJqYjI1MFlXbHVaWEl1WW1sdVpDZ25aSEpoWjJ4bFlYWmxKeXdnWm5WdVkzUnBiMjRvWlhabGJuUXBJSHRjY2x4dVhISmNibHgwWEhSY2RIMHBPMXh5WEc1Y2NseHVYSFJjZEZ4MFkyOXVkR0ZwYm1WeUxtSnBibVFvSjJSeVlXZHZkbVZ5Snl3Z1puVnVZM1JwYjI0b1pYWmxiblFwSUh0Y2NseHVYSFJjZEZ4MFhIUjJZWElnWm05MWJtUWdQU0JtWVd4elpUdGNjbHh1WEhSY2RGeDBYSFJtYjNJb2RtRnlJR2s5TUR0cFBHVjJaVzUwTG05eWFXZHBibUZzUlhabGJuUXVaR0YwWVZSeVlXNXpabVZ5TG5SNWNHVnpMbXhsYm1kMGFEdHBLeXNwSUh0Y2NseHVYSFJjZEZ4MFhIUmNkSFpoY2lCMGVYQmxJRDBnWlhabGJuUXViM0pwWjJsdVlXeEZkbVZ1ZEM1a1lYUmhWSEpoYm5ObVpYSXVkSGx3WlhOYmFWMDdYSEpjYmx4MFhIUmNkRngwWEhScFppaDBlWEJsUFQwOUoyRndjR3hwWTJGMGFXOXVMM2d0YkhndGQybHVaRzkzTFhCaGJtVW5LU0I3WEhKY2JseDBYSFJjZEZ4MFhIUmNkR1p2ZFc1a0lEMGdkSEoxWlR0Y2NseHVYSFJjZEZ4MFhIUmNkRngwWW5KbFlXczdYSEpjYmx4MFhIUmNkRngwWEhSOUlGeDBYSFJjY2x4dVhIUmNkRngwWEhSOVhISmNibHgwWEhSY2RGeDBhV1lvSVdadmRXNWtLU0I3WEhKY2JseDBYSFJjZEZ4MFhIUnlaWFIxY200N1hISmNibHgwWEhSY2RGeDBmVnh5WEc1Y2RGeDBYSFJjZEdWMlpXNTBMbkJ5WlhabGJuUkVaV1poZFd4MEtDazdYSEpjYmx4MFhIUmNkRngwWlhabGJuUXVjM1J2Y0ZCeWIzQmhaMkYwYVc5dUtDazdYSEpjYmx4MFhIUmNkRngwZG1GeUlIUmhjbWRsZENBOUlHVjJaVzUwTG1OMWNuSmxiblJVWVhKblpYUTdYSEpjYmx4MFhIUmNkRngwZG1GeUlHSnZkVzVrY3lBOUlIUmhjbWRsZEM1blpYUkNiM1Z1WkdsdVowTnNhV1Z1ZEZKbFkzUW9LVHRjZEZ4MFhIUmNkRnh5WEc1Y2RGeDBYSFJjZEhaaGNpQm9aV2xuYUhRZ1BTQmliM1Z1WkhNdVltOTBkRzl0SUMwZ1ltOTFibVJ6TG5SdmNEdGNjbHh1WEhSY2RGeDBYSFIyWVhJZ2QybGtkR2dnUFNCaWIzVnVaSE11Y21sbmFIUWdMU0JpYjNWdVpITXViR1ZtZER0Y2NseHVYSEpjYmx4MFhIUmNkRngwZG1GeUlHOW1abk5sZENBOUlHTnZiblJoYVc1bGNpNXZabVp6WlhRb0tUdGNjbHh1WEhSY2RGeDBYSFIyWVhJZ1lYSmxZU0E5SUdkbGRFRnlaV0ZHY205dFJYWmxiblFvWlhabGJuUXBPMXh5WEc1Y2RGeDBYSFJjZEhOM2FYUmphQ2hoY21WaEtTQjdYSEpjYmx4MFhIUmNkRngwWEhSallYTmxJRUZTUlVGVExsUlBVRHBjY2x4dVhIUmNkRngwWEhSY2RGeDBjM0JzYVhSQmNtVmhMbTltWm5ObGRDaDdkRzl3T205bVpuTmxkQzUwYjNBc0lHeGxablE2YjJabWMyVjBMbXhsWm5SOUtUdGNjbHh1WEhSY2RGeDBYSFJjZEZ4MGMzQnNhWFJCY21WaExuZHBaSFJvS0hkcFpIUm9LVHRjY2x4dVhIUmNkRngwWEhSY2RGeDBjM0JzYVhSQmNtVmhMbWhsYVdkb2RDaG9aV2xuYUhRdk1pazdYSEpjYmx4MFhIUmNkRngwWEhSY2RHSnlaV0ZyTzF4MFhISmNibHgwWEhSY2RGeDBYSFJqWVhObElFRlNSVUZUTGxKSlIwaFVPbHh5WEc1Y2RGeDBYSFJjZEZ4MFhIUnpjR3hwZEVGeVpXRXViMlptYzJWMEtIdDBiM0E2YjJabWMyVjBMblJ2Y0N3Z2JHVm1kRHB2Wm1aelpYUXViR1ZtZEN0M2FXUjBhQzh5ZlNrN1hISmNibHgwWEhSY2RGeDBYSFJjZEhOd2JHbDBRWEpsWVM1M2FXUjBhQ2gzYVdSMGFDOHlLVHRjY2x4dVhIUmNkRngwWEhSY2RGeDBjM0JzYVhSQmNtVmhMbWhsYVdkb2RDaG9aV2xuYUhRcE8xeHlYRzVjZEZ4MFhIUmNkRngwWEhSaWNtVmhhenRjY2x4dVhIUmNkRngwWEhSY2RHTmhjMlVnUVZKRlFWTXVURVZHVkRwY2NseHVYSFJjZEZ4MFhIUmNkRngwYzNCc2FYUkJjbVZoTG05bVpuTmxkQ2g3ZEc5d09tOW1abk5sZEM1MGIzQXNJR3hsWm5RNmIyWm1jMlYwTG14bFpuUjlLVHRjY2x4dVhIUmNkRngwWEhSY2RGeDBjM0JzYVhSQmNtVmhMbmRwWkhSb0tIZHBaSFJvTHpJcE8xeHlYRzVjZEZ4MFhIUmNkRngwWEhSemNHeHBkRUZ5WldFdWFHVnBaMmgwS0dobGFXZG9kQ2s3WEhKY2JseDBYSFJjZEZ4MFhIUmNkR0p5WldGck8xeHlYRzVjZEZ4MFhIUmNkRngwWTJGelpTQkJVa1ZCVXk1Q1QxUlVUMDA2WEhKY2JseDBYSFJjZEZ4MFhIUmNkSE53YkdsMFFYSmxZUzV2Wm1aelpYUW9lM1J2Y0RwdlptWnpaWFF1ZEc5d0syaGxhV2RvZEM4eUxDQnNaV1owT205bVpuTmxkQzVzWldaMGZTazdYSEpjYmx4MFhIUmNkRngwWEhSY2RITndiR2wwUVhKbFlTNTNhV1IwYUNoM2FXUjBhQ2s3WEhKY2JseDBYSFJjZEZ4MFhIUmNkSE53YkdsMFFYSmxZUzVvWldsbmFIUW9hR1ZwWjJoMEx6SXBPMXh5WEc1Y2RGeDBYSFJjZEZ4MFhIUmljbVZoYXp0Y2NseHVYSFJjZEZ4MFhIUjlYSEpjYmx4MFhIUmNkSDBwTzF4eVhHNWNkRngwZlZ4eVhHNGdJQ0FnSUNCOU8xeHlYRzRnSUgwcE8xeHlYRzVjY2x4dWRtRnlJRUZTUlVGVElEMGdlMXh5WEc1Y2RGUlBVRG9uZEc5d0p5d2dYSEpjYmx4MFRFVkdWRG9uYkdWbWRDY3NJRnh5WEc1Y2RGSkpSMGhVT2lkeWFXZG9kQ2NzSUZ4eVhHNWNkRUpQVkZSUFRUb25ZbTkwZEc5dEoxeHlYRzU5WEhKY2JseHlYRzVtZFc1amRHbHZiaUJuWlhSQmNtVmhSbkp2YlVWMlpXNTBLR1YyWlc1MEtTQjdYSEpjYmx4MGRtRnlJSFJoY21kbGRDQTlJR1YyWlc1MExtTjFjbkpsYm5SVVlYSm5aWFE3WEhKY2JseDBkbUZ5SUdKdmRXNWtjeUE5SUhSaGNtZGxkQzVuWlhSQ2IzVnVaR2x1WjBOc2FXVnVkRkpsWTNRb0tUdGNkRngwWEhSY2RGeHlYRzVjY2x4dUlDQWdJSFpoY2lCd2IzTlpJRDBnWlhabGJuUXViM0pwWjJsdVlXeEZkbVZ1ZEM1amJHbGxiblJaSUMwZ1ltOTFibVJ6TG5SdmNEdGNjbHh1SUNBZ0lIWmhjaUJ3YjNOWUlEMGdaWFpsYm5RdWIzSnBaMmx1WVd4RmRtVnVkQzVqYkdsbGJuUllJQzBnWW05MWJtUnpMbXhsWm5RN1hISmNiaUFnSUNCeVpYUjFjbTRnWjJWMFFYSmxZU2hpYjNWdVpITXNJSEJ2YzFnc0lIQnZjMWtwTzF4eVhHNTlYSEpjYmx4eVhHNWNjbHh1Wm5WdVkzUnBiMjRnWjJWMFFYSmxZU2hpYjNWdVpITXNJSEJ2YzFnc0lIQnZjMWtwSUh0Y2NseHVYSFIyWVhJZ2FHVnBaMmgwSUQwZ1ltOTFibVJ6TG1KdmRIUnZiU0F0SUdKdmRXNWtjeTUwYjNBN1hISmNibHgwZG1GeUlIZHBaSFJvSUQwZ1ltOTFibVJ6TG5KcFoyaDBJQzBnWW05MWJtUnpMbXhsWm5RN1hISmNibHgwZG1GeUlIQmpkRmtnUFNCd2IzTlpMMmhsYVdkb2REdGNjbHh1WEhSMllYSWdjR04wV0NBOUlIQnZjMWd2ZDJsa2RHZzdYSEpjYmx4MEx5OWpZV3hqZFd4aGRHVWdjMnh2Y0dWelhISmNibHgwZG1GeUlHOUJSQ0E5SUhCamRGZ3ZjR04wV1Q0eE8xeHlYRzVjZEhaaGNpQnZRMElnUFNCd1kzUllMeWd4TFhCamRGa3BQRDB4TzF4eVhHNWNkR2xtS0c5QlJDa2dlMXh5WEc1Y2RGeDBhV1lvYjBOQ0tTQjdYSEpjYmx4MFhIUmNkSEpsZEhWeWJpQkJVa1ZCVXk1VVQxQTdYSEpjYmx4MFhIUjlJR1ZzYzJVZ2UxeHlYRzVjZEZ4MFhIUnlaWFIxY200Z1FWSkZRVk11VWtsSFNGUTdYSEpjYmx4MFhIUjlYSEpjYmx4MGZTQmxiSE5sSUh0Y2NseHVYSFJjZEdsbUtHOURRaWtnZTF4eVhHNWNkRngwWEhSeVpYUjFjbTRnUVZKRlFWTXVURVZHVkR0Y2NseHVYSFJjZEgwZ1pXeHpaU0I3WEhKY2JseDBYSFJjZEhKbGRIVnliaUJCVWtWQlV5NUNUMVJVVDAwN1hISmNibHgwWEhSOVhISmNibHgwZlZ4eVhHNTlYSEpjYmlKZGZRPT0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliJyk7IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIGFuZ3VsYXIgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5hbmd1bGFyIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbC5hbmd1bGFyIDogbnVsbCk7XHJcbnZhciBib3hNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgndWkuYm94Jyk7XHJcbnJlcXVpcmUoJy4vdHJhbnNjbHVkZS1yZXBsYWNlJyk7XHJcblxyXG52YXIgX21ha2VEaXJlY3RpdmUgPSBmdW5jdGlvbihkaXJlY3Rpb24pIHtcclxuXHR2YXIgX21vZGVIb3Jpem9udGFsID0gZGlyZWN0aW9uPT09J2hvcml6b250YWwnO1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDogJ0UnLFxyXG5cdFx0cmVwbGFjZTogdHJ1ZSxcclxuXHRcdHRyYW5zY2x1ZGU6IHRydWUsXHJcblx0XHR0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJzcGxpdGJveFwiPjxkaXYgY2xhc3M9XCJzcGxpdHRlclwiPjxkaXY+IDwvZGl2PjwvZGl2PjxkaXYgdWktdHJhbnNjbHVkZS1yZXBsYWNlLz48L2Rpdj4nLFxyXG5cdFx0bGluazogIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XHJcblx0dmFyIF9pc0RyYWdnaW5nID0gZmFsc2U7XHJcblxyXG5cdHZhciBzcGxpdHRlciA9IGVsZW1lbnQuY2hpbGRyZW4oKS5lcSgwKTtcclxuXHR2YXIgc3BsaXR0ZXJTaXplID0gYXR0ci5zcGxpdHRlclNpemUgfHwgMTtcclxuXHR2YXIgb25lTWluU2l6ZSA9IGF0dHIub25lTWluU2l6ZSB8fCAxO1xyXG5cdHZhciB0d29NaW5TaXplID0gYXR0ci50d29NaW5TaXplIHx8IDE7XHJcblxyXG5cdHZhciBvbmUgPSBlbGVtZW50LmNoaWxkcmVuKCkuZXEoMSk7XHJcblx0dmFyIHR3byA9IGVsZW1lbnQuY2hpbGRyZW4oKS5lcSgyKTtcclxuXHRlbGVtZW50LmFkZENsYXNzKF9tb2RlSG9yaXpvbnRhbCA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCcpO1xyXG5cdHNwbGl0dGVyLmFkZENsYXNzKF9tb2RlSG9yaXpvbnRhbCA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCcpO1xyXG5cdG9uZS5hZGRDbGFzcygnc3BsaXRib3hib3gnKTtcclxuXHR0d28uYWRkQ2xhc3MoJ3NwbGl0Ym94Ym94Jyk7XHJcblx0XHJcblx0ZWxlbWVudC5iaW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0aWYoIV9pc0RyYWdnaW5nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBib3VuZHMgPSBlbGVtZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHJcblx0XHRcdGlmKF9tb2RlSG9yaXpvbnRhbCkge1xyXG5cdFx0XHRcdF90aWNrKGV2ZW50LmNsaWVudFkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdF90aWNrKGV2ZW50LmNsaWVudFgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHNwbGl0dGVyLmJpbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0X2lzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cdH0pO1xyXG5cdGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkuYmluZCgnbW91c2V1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRfaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBfdGljayhtb3VzZVBvcykge1xyXG5cdFx0dmFyIHBjdCA9IDA7XHJcblx0XHR2YXIgYm91bmRzID0gZWxlbWVudFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRpZihfbW9kZUhvcml6b250YWwpe1xyXG5cdFx0ICAgIHZhciBoZWlnaHQgPSBib3VuZHMuYm90dG9tIC0gYm91bmRzLnRvcDtcclxuXHRcdCAgICB2YXIgcG9zID0gbW91c2VQb3MgLSBib3VuZHMudG9wO1xyXG4gICAgICAgICAgICBpZiAocG9zIDwgb25lTWluU2l6ZSkgcmV0dXJuO1xyXG5cdFx0ICAgIGlmIChoZWlnaHQgLSBwb3MgPCB0d29NaW5TaXplKSByZXR1cm47XHJcblxyXG5cdFx0XHRwY3QgPSBwb3MvaGVpZ2h0KjEwMDtcclxuXHQgICAgXHRzcGxpdHRlci5jc3MoJ3RvcCcscGN0ICsgJyUnKTtcclxuXHQgICAgXHRvbmUuY3NzKCdoZWlnaHQnLCBwY3QgKyAnJScpO1xyXG5cdFx0ICAgIHR3by5jc3MoJ3RvcCcsIHBjdCArICclJyk7XHRcdFx0XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0ICAgIHZhciB3aWR0aCA9IGJvdW5kcy5yaWdodCAtIGJvdW5kcy5sZWZ0O1xyXG5cdFx0ICAgIHZhciBwb3MgPSBtb3VzZVBvcyAtIGJvdW5kcy5sZWZ0O1xyXG4gICAgICAgICAgICBpZiAocG9zIDwgb25lTWluU2l6ZSkgcmV0dXJuO1xyXG5cdFx0ICAgIGlmICh3aWR0aCAtIHBvcyA8IHR3b01pblNpemUpIHJldHVybjtcclxuXHJcblx0XHRcdHBjdCA9IHBvcy93aWR0aCoxMDA7XHJcblx0XHQgICBzcGxpdHRlci5jc3MoJ2xlZnQnLHBjdCArICclJyk7XHJcblx0XHQgICAgb25lLmNzcygnd2lkdGgnLCBwY3QgKyAnJScpO1xyXG5cdCAgICBcdHR3by5jc3MoJ2xlZnQnLCBwY3QgKyAnJScpO1x0XHRcdFxyXG5cclxuXHRcdH1cclxuXHR9XHJcblxyXG4vL1x0XHRcdHZhciBmaXJzdEJvdW5kcyA9IG9uZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHR2YXIgX2luaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBib3VuZHMgPSBlbGVtZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1x0XHRcclxuXHRcdGlmKF9tb2RlSG9yaXpvbnRhbCkge1xyXG5cdFx0XHRfdGljaygoYm91bmRzLmJvdHRvbSAtIGJvdW5kcy50b3ApLzIpO1xyXG5cdFx0fSBlbHNle1xyXG5cdFx0XHRfdGljaygoYm91bmRzLnJpZ2h0IC0gYm91bmRzLnRvcCkvMik7XHJcblx0XHR9XHJcblx0fVxyXG5cdF9pbml0KCk7XHJcbn1cclxuXHJcblx0fVxyXG59XHJcblxyXG5ib3hNb2R1bGUuZGlyZWN0aXZlKCdoYm94JywgZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIF9tYWtlRGlyZWN0aXZlKCdob3Jpem9udGFsJyk7XHJcbn0pO1xyXG5cclxuYm94TW9kdWxlLmRpcmVjdGl2ZSgndmJveCcsIGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiBfbWFrZURpcmVjdGl2ZSgndmVydGljYWwnKTtcclxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Y0d4cGRHSnZlQzlzYVdJdlltOTRMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpZG1GeUlHRnVaM1ZzWVhJZ1BTQW9kSGx3Wlc5bUlIZHBibVJ2ZHlBaFBUMGdYQ0oxYm1SbFptbHVaV1JjSWlBL0lIZHBibVJ2ZHk1aGJtZDFiR0Z5SURvZ2RIbHdaVzltSUdkc2IySmhiQ0FoUFQwZ1hDSjFibVJsWm1sdVpXUmNJaUEvSUdkc2IySmhiQzVoYm1kMWJHRnlJRG9nYm5Wc2JDazdYSEpjYm5aaGNpQmliM2hOYjJSMWJHVWdQU0JoYm1kMWJHRnlMbTF2WkhWc1pTZ25kV2t1WW05NEp5azdYSEpjYm5KbGNYVnBjbVVvSnk0dmRISmhibk5qYkhWa1pTMXlaWEJzWVdObEp5azdYSEpjYmx4eVhHNTJZWElnWDIxaGEyVkVhWEpsWTNScGRtVWdQU0JtZFc1amRHbHZiaWhrYVhKbFkzUnBiMjRwSUh0Y2NseHVYSFIyWVhJZ1gyMXZaR1ZJYjNKcGVtOXVkR0ZzSUQwZ1pHbHlaV04wYVc5dVBUMDlKMmh2Y21sNmIyNTBZV3duTzF4eVhHNWNkSEpsZEhWeWJpQjdYSEpjYmx4MFhIUnlaWE4wY21samREb2dKMFVuTEZ4eVhHNWNkRngwY21Wd2JHRmpaVG9nZEhKMVpTeGNjbHh1WEhSY2RIUnlZVzV6WTJ4MVpHVTZJSFJ5ZFdVc1hISmNibHgwWEhSMFpXMXdiR0YwWlRvZ0p6eGthWFlnWTJ4aGMzTTlYQ0p6Y0d4cGRHSnZlRndpUGp4a2FYWWdZMnhoYzNNOVhDSnpjR3hwZEhSbGNsd2lQanhrYVhZK0lEd3ZaR2wyUGp3dlpHbDJQanhrYVhZZ2RXa3RkSEpoYm5OamJIVmtaUzF5WlhCc1lXTmxMejQ4TDJScGRqNG5MRnh5WEc1Y2RGeDBiR2x1YXpvZ0lHWjFibU4wYVc5dUtITmpiM0JsTENCbGJHVnRaVzUwTENCaGRIUnlLU0I3WEhKY2JseDBkbUZ5SUY5cGMwUnlZV2RuYVc1bklEMGdabUZzYzJVN1hISmNibHh5WEc1Y2RIWmhjaUJ6Y0d4cGRIUmxjaUE5SUdWc1pXMWxiblF1WTJocGJHUnlaVzRvS1M1bGNTZ3dLVHRjY2x4dVhIUjJZWElnYzNCc2FYUjBaWEpUYVhwbElEMGdZWFIwY2k1emNHeHBkSFJsY2xOcGVtVWdmSHdnTVR0Y2NseHVYSFIyWVhJZ2IyNWxUV2x1VTJsNlpTQTlJR0YwZEhJdWIyNWxUV2x1VTJsNlpTQjhmQ0F4TzF4eVhHNWNkSFpoY2lCMGQyOU5hVzVUYVhwbElEMGdZWFIwY2k1MGQyOU5hVzVUYVhwbElIeDhJREU3WEhKY2JseHlYRzVjZEhaaGNpQnZibVVnUFNCbGJHVnRaVzUwTG1Ob2FXeGtjbVZ1S0NrdVpYRW9NU2s3WEhKY2JseDBkbUZ5SUhSM2J5QTlJR1ZzWlcxbGJuUXVZMmhwYkdSeVpXNG9LUzVsY1NneUtUdGNjbHh1WEhSbGJHVnRaVzUwTG1Ga1pFTnNZWE56S0Y5dGIyUmxTRzl5YVhwdmJuUmhiQ0EvSUNkb2IzSnBlbTl1ZEdGc0p5QTZJQ2QyWlhKMGFXTmhiQ2NwTzF4eVhHNWNkSE53YkdsMGRHVnlMbUZrWkVOc1lYTnpLRjl0YjJSbFNHOXlhWHB2Ym5SaGJDQS9JQ2RvYjNKcGVtOXVkR0ZzSnlBNklDZDJaWEowYVdOaGJDY3BPMXh5WEc1Y2RHOXVaUzVoWkdSRGJHRnpjeWduYzNCc2FYUmliM2hpYjNnbktUdGNjbHh1WEhSMGQyOHVZV1JrUTJ4aGMzTW9KM053YkdsMFltOTRZbTk0SnlrN1hISmNibHgwWEhKY2JseDBaV3hsYldWdWRDNWlhVzVrS0NkdGIzVnpaVzF2ZG1VbkxDQm1kVzVqZEdsdmJpaGxkbVZ1ZENrZ2UxeHlYRzVjZEZ4MGFXWW9JVjlwYzBSeVlXZG5hVzVuS1NCN1hISmNibHgwWEhSY2RISmxkSFZ5Ymp0Y2NseHVYSFJjZEgwZ1pXeHpaU0I3WEhKY2JseDBYSFJjZEhaaGNpQmliM1Z1WkhNZ1BTQmxiR1Z0Wlc1MFd6QmRMbWRsZEVKdmRXNWthVzVuUTJ4cFpXNTBVbVZqZENncE8xeHlYRzVjY2x4dVhISmNibHgwWEhSY2RHbG1LRjl0YjJSbFNHOXlhWHB2Ym5SaGJDa2dlMXh5WEc1Y2RGeDBYSFJjZEY5MGFXTnJLR1YyWlc1MExtTnNhV1Z1ZEZrcE8xeHlYRzVjZEZ4MFhIUjlYSEpjYmx4MFhIUmNkR1ZzYzJVZ2UxeHlYRzVjZEZ4MFhIUmNkRjkwYVdOcktHVjJaVzUwTG1Oc2FXVnVkRmdwTzF4eVhHNWNkRngwWEhSOVhISmNibHgwWEhSOVhISmNibHgwZlNrN1hISmNibHh5WEc1Y2RITndiR2wwZEdWeUxtSnBibVFvSjIxdmRYTmxaRzkzYmljc0lHWjFibU4wYVc5dUtHVjJaVzUwS1NCN1hISmNibHgwWEhSbGRtVnVkQzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh5WEc1Y2RGeDBYMmx6UkhKaFoyZHBibWNnUFNCMGNuVmxPMXh5WEc1Y2RIMHBPMXh5WEc1Y2RHRnVaM1ZzWVhJdVpXeGxiV1Z1ZENoa2IyTjFiV1Z1ZENrdVltbHVaQ2duYlc5MWMyVjFjQ2NzSUdaMWJtTjBhVzl1S0dWMlpXNTBLU0I3WEhKY2JseDBYSFJmYVhORWNtRm5aMmx1WnlBOUlHWmhiSE5sTzF4eVhHNWNkSDBwTzF4eVhHNWNjbHh1WEhSbWRXNWpkR2x2YmlCZmRHbGpheWh0YjNWelpWQnZjeWtnZTF4eVhHNWNkRngwZG1GeUlIQmpkQ0E5SURBN1hISmNibHgwWEhSMllYSWdZbTkxYm1SeklEMGdaV3hsYldWdWRGc3dYUzVuWlhSQ2IzVnVaR2x1WjBOc2FXVnVkRkpsWTNRb0tUdGNjbHh1WEhKY2JseDBYSFJwWmloZmJXOWtaVWh2Y21sNmIyNTBZV3dwZTF4eVhHNWNkRngwSUNBZ0lIWmhjaUJvWldsbmFIUWdQU0JpYjNWdVpITXVZbTkwZEc5dElDMGdZbTkxYm1SekxuUnZjRHRjY2x4dVhIUmNkQ0FnSUNCMllYSWdjRzl6SUQwZ2JXOTFjMlZRYjNNZ0xTQmliM1Z1WkhNdWRHOXdPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY0c5eklEd2diMjVsVFdsdVUybDZaU2tnY21WMGRYSnVPMXh5WEc1Y2RGeDBJQ0FnSUdsbUlDaG9aV2xuYUhRZ0xTQndiM01nUENCMGQyOU5hVzVUYVhwbEtTQnlaWFIxY200N1hISmNibHh5WEc1Y2RGeDBYSFJ3WTNRZ1BTQndiM012YUdWcFoyaDBLakV3TUR0Y2NseHVYSFFnSUNBZ1hIUnpjR3hwZEhSbGNpNWpjM01vSjNSdmNDY3NjR04wSUNzZ0p5VW5LVHRjY2x4dVhIUWdJQ0FnWEhSdmJtVXVZM056S0Nkb1pXbG5hSFFuTENCd1kzUWdLeUFuSlNjcE8xeHlYRzVjZEZ4MElDQWdJSFIzYnk1amMzTW9KM1J2Y0Njc0lIQmpkQ0FySUNjbEp5azdYSFJjZEZ4MFhISmNibHgwWEhSOUlHVnNjMlVnZTF4eVhHNWNkRngwSUNBZ0lIWmhjaUIzYVdSMGFDQTlJR0p2ZFc1a2N5NXlhV2RvZENBdElHSnZkVzVrY3k1c1pXWjBPMXh5WEc1Y2RGeDBJQ0FnSUhaaGNpQndiM01nUFNCdGIzVnpaVkJ2Y3lBdElHSnZkVzVrY3k1c1pXWjBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY0c5eklEd2diMjVsVFdsdVUybDZaU2tnY21WMGRYSnVPMXh5WEc1Y2RGeDBJQ0FnSUdsbUlDaDNhV1IwYUNBdElIQnZjeUE4SUhSM2IwMXBibE5wZW1VcElISmxkSFZ5Ymp0Y2NseHVYSEpjYmx4MFhIUmNkSEJqZENBOUlIQnZjeTkzYVdSMGFDb3hNREE3WEhKY2JseDBYSFFnSUNCemNHeHBkSFJsY2k1amMzTW9KMnhsWm5RbkxIQmpkQ0FySUNjbEp5azdYSEpjYmx4MFhIUWdJQ0FnYjI1bExtTnpjeWduZDJsa2RHZ25MQ0J3WTNRZ0t5QW5KU2NwTzF4eVhHNWNkQ0FnSUNCY2RIUjNieTVqYzNNb0oyeGxablFuTENCd1kzUWdLeUFuSlNjcE8xeDBYSFJjZEZ4eVhHNWNjbHh1WEhSY2RIMWNjbHh1WEhSOVhISmNibHh5WEc0dkwxeDBYSFJjZEhaaGNpQm1hWEp6ZEVKdmRXNWtjeUE5SUc5dVpTNW5aWFJDYjNWdVpHbHVaME5zYVdWdWRGSmxZM1FvS1R0Y2NseHVYSFIyWVhJZ1gybHVhWFFnUFNCbWRXNWpkR2x2YmlncElIdGNjbHh1WEhSY2RIWmhjaUJpYjNWdVpITWdQU0JsYkdWdFpXNTBXekJkTG1kbGRFSnZkVzVrYVc1blEyeHBaVzUwVW1WamRDZ3BPMXgwWEhSY2NseHVYSFJjZEdsbUtGOXRiMlJsU0c5eWFYcHZiblJoYkNrZ2UxeHlYRzVjZEZ4MFhIUmZkR2xqYXlnb1ltOTFibVJ6TG1KdmRIUnZiU0F0SUdKdmRXNWtjeTUwYjNBcEx6SXBPMXh5WEc1Y2RGeDBmU0JsYkhObGUxeHlYRzVjZEZ4MFhIUmZkR2xqYXlnb1ltOTFibVJ6TG5KcFoyaDBJQzBnWW05MWJtUnpMblJ2Y0Nrdk1pazdYSEpjYmx4MFhIUjlYSEpjYmx4MGZWeHlYRzVjZEY5cGJtbDBLQ2s3WEhKY2JuMWNjbHh1WEhKY2JseDBmVnh5WEc1OVhISmNibHh5WEc1aWIzaE5iMlIxYkdVdVpHbHlaV04wYVhabEtDZG9ZbTk0Snl3Z1puVnVZM1JwYjI0b0tTQjdYSEpjYmx4MGNtVjBkWEp1SUY5dFlXdGxSR2x5WldOMGFYWmxLQ2RvYjNKcGVtOXVkR0ZzSnlrN1hISmNibjBwTzF4eVhHNWNjbHh1WW05NFRXOWtkV3hsTG1ScGNtVmpkR2wyWlNnbmRtSnZlQ2NzSUdaMWJtTjBhVzl1S0NrZ2UxeHlYRzVjZEhKbGRIVnliaUJmYldGclpVUnBjbVZqZEdsMlpTZ25kbVZ5ZEdsallXd25LVHRjY2x4dWZTazdJbDE5IiwidmFyIGJveE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCd1aS5ib3gnLCBbXSk7XHJcblxyXG5yZXF1aXJlKCcuL2JveCcpOyIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBhbmd1bGFyID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuYW5ndWxhciA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwuYW5ndWxhciA6IG51bGwpO1xyXG52YXIgYm94TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3VpLmJveCcpO1xyXG5cclxuYm94TW9kdWxlLmRpcmVjdGl2ZSgndWlUcmFuc2NsdWRlUmVwbGFjZScsIFsnJGxvZycsIGZ1bmN0aW9uICgkbG9nKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0ZXJtaW5hbDogdHJ1ZSxcclxuICAgICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG5cclxuICAgICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgY3RybCwgdHJhbnNjbHVkZSkge1xyXG4gICAgICAgICAgICAgIGlmICghdHJhbnNjbHVkZSkge1xyXG4gICAgICAgICAgICAgICAgICAkbG9nLmVycm9yKCdvcnBoYW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdJbGxlZ2FsIHVzZSBvZiB1aVRyYW5zY2x1ZGVSZXBsYWNlIGRpcmVjdGl2ZSBpbiB0aGUgdGVtcGxhdGUhICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdObyBwYXJlbnQgZGlyZWN0aXZlIHRoYXQgcmVxdWlyZXMgYSB0cmFuc2NsdXNpb24gZm91bmQuICcpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRyYW5zY2x1ZGUoJGVsZW1lbnQuc2NvcGUoKSwgZnVuY3Rpb24gKGNsb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChjbG9uZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlcGxhY2VXaXRoKGNsb25lKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgfV0pO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5emNHeHBkR0p2ZUM5c2FXSXZkSEpoYm5OamJIVmtaUzF5WlhCc1lXTmxMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUoyWVhJZ1lXNW5kV3hoY2lBOUlDaDBlWEJsYjJZZ2QybHVaRzkzSUNFOVBTQmNJblZ1WkdWbWFXNWxaRndpSUQ4Z2QybHVaRzkzTG1GdVozVnNZWElnT2lCMGVYQmxiMllnWjJ4dlltRnNJQ0U5UFNCY0luVnVaR1ZtYVc1bFpGd2lJRDhnWjJ4dlltRnNMbUZ1WjNWc1lYSWdPaUJ1ZFd4c0tUdGNjbHh1ZG1GeUlHSnZlRTF2WkhWc1pTQTlJR0Z1WjNWc1lYSXViVzlrZFd4bEtDZDFhUzVpYjNnbktUdGNjbHh1WEhKY2JtSnZlRTF2WkhWc1pTNWthWEpsWTNScGRtVW9KM1ZwVkhKaGJuTmpiSFZrWlZKbGNHeGhZMlVuTENCYkp5UnNiMmNuTENCbWRXNWpkR2x2YmlBb0pHeHZaeWtnZTF4eVhHNGdJQ0FnSUNCeVpYUjFjbTRnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdkR1Z5YldsdVlXdzZJSFJ5ZFdVc1hISmNiaUFnSUNBZ0lDQWdJQ0J5WlhOMGNtbGpkRG9nSjBWQkp5eGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQnNhVzVyT2lCbWRXNWpkR2x2YmlBb0pITmpiM0JsTENBa1pXeGxiV1Z1ZEN3Z0pHRjBkSElzSUdOMGNtd3NJSFJ5WVc1elkyeDFaR1VwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9JWFJ5WVc1elkyeDFaR1VwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKR3h2Wnk1bGNuSnZjaWduYjNKd2FHRnVKeXhjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW5TV3hzWldkaGJDQjFjMlVnYjJZZ2RXbFVjbUZ1YzJOc2RXUmxVbVZ3YkdGalpTQmthWEpsWTNScGRtVWdhVzRnZEdobElIUmxiWEJzWVhSbElTQW5JQ3RjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW5UbThnY0dGeVpXNTBJR1JwY21WamRHbDJaU0IwYUdGMElISmxjWFZwY21WeklHRWdkSEpoYm5OamJIVnphVzl1SUdadmRXNWtMaUFuS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdU8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQjBjbUZ1YzJOc2RXUmxLQ1JsYkdWdFpXNTBMbk5qYjNCbEtDa3NJR1oxYm1OMGFXOXVJQ2hqYkc5dVpTa2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9ZMnh2Ym1VdWJHVnVaM1JvS1NCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa1pXeGxiV1Z1ZEM1eVpYQnNZV05sVjJsMGFDaGpiRzl1WlNrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pXeHpaU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrWld4bGJXVnVkQzV5WlcxdmRtVW9LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQjlPMXh5WEc0Z0lIMWRLVHNpWFgwPSIsInJlcXVpcmUoJ3NwbGl0Ym94Jyk7XHJcbnJlcXVpcmUoJy4uJyk7Il19
