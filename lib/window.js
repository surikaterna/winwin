var angular = require('angular');
var module = angular.module('ui.winwin');
var getAreaFromEvent = require('./area_finder')
var AREAS = require('./areas');

module.controller('WindowController', ['$scope', function windowController($scope) {
  var ctrl = this;
  var panes = ctrl.panes = $scope.panes = [];

  ctrl.select = function(selectedPane) {
    angular.forEach(panes, function(pane) {
      if (pane.active && pane !== selectedPane) {
        pane.active = false;
        pane.onDeselect();
      }
    });
    selectedPane.active = true;
    selectedPane.onSelect();
  }

  ctrl.addPane = function(pane) {
    panes.push(pane);
    if (panes.length > 0) ctrl.select(pane);
  }

  ctrl.removePane = function(pane) {
    var index = panes.indexOf(pane);
    panes.splice(index, 1);
    if (panes.length > 0) {
      ctrl.select(panes[0]);
    } else if (panes.length === 0 && !ctrl.isDestroying) {
      ctrl.isDestroying = true;
      $scope.destroyMe();
    }
  }

  ctrl.createPane = function(_caption, _content) {}
}]);


function _getPane(paneData, paneResolverService) {
  var paneId = paneData.id;
  var newPane;
  if (paneId) {
    var sourcePane = $('#' + paneId);
    var sourceContentPane = $('#' + paneId + '-content');

    newPane = angular.element('<pane caption="' + sourcePane.text() + '"></pane>');
    newPane.append(sourceContentPane.contents());
    setTimeout(function() {
      sourcePane.remove();
    }, 0);
  } else {
    newPane = paneResolverService.resolve(paneData);
  }
  return newPane;
}

module.directive('window', function($compile, paneResolverService, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    require: 'window',
    scope: {},
    template: '\
      <div class="window"> \
        <div class="window-header" \
             ui-transclude  \
             ui-droppable   \
             ui-drop-accepts="application/x-lx-window-pane"  \
             on-drop="headerDrop(event)"></div> \
        <div class="window-content"> \
          <div ng-repeat="pane in panes" \
               ng-show="pane.active" \
               pane-content-transclude="pane" \
               id="{{id}}-content" \
               class="pane"></div> \
        </div> \
      </div>',
    controllerAs: 'vm',
    controller: 'WindowController',
    link: function(scope, element, attr, windowController) {
      // function createPane(caption) {
      //   var newPane = $('<pane caption="' + caption + '"></pane>');
      //   var childScope = scope.$new(true);
      //   $compile(newPane)(childScope, undefined, {
      //     window: windowController
      //   });
      //   return newPane;
      // }

      var splitArea = $('body').children('.splitdroparea');
      if (!splitArea.length) {
        splitArea = $('<div class="splitdroparea" style="display:none;"></div>');
        splitArea.appendTo($('body'));
      }
      var headerContainer = element.children('.window-header');
      var container = element.children('.window-content');

      function _drop(event, split) {
        var paneString = event.dataTransfer.getData('application/x-lx-window-pane');
        var paneData = angular.fromJson(paneString);
        var newPane = _getPane(paneData, paneResolverService);
        if (!newPane) {
          return;
        }
        // just add to this window
        if (!split) {
          newPane.appendTo(headerContainer);
          $compile(newPane)(scope.$new(true), undefined, {
            window: windowController
          });
        } else {
          var newWindow = $compile('<window></window>')(scope.$new(true), undefined, {});
          newPane.appendTo(newWindow.children('.window-header'));
          $compile(newPane)(scope.$new(true), undefined, {
            window: windowController
          });

          var prev = element.prev();
          var parent = element.parent();
          var targetArea = getAreaFromEvent(event);
          var boxTag = '';
          switch (targetArea) {
          case AREAS.TOP:
          case AREAS.BOTTOM:
            boxTag = 'hbox';
            break;
          default:
            boxTag = 'vbox';
          }
          var box = angular.element('<' + boxTag + '><div></div><div></div></' + boxTag + '>');
          $compile(box)(scope.$new(true), undefined, {});
          // remove both dummy divs
          // children 0 is the divider
          box.children().eq(2).remove();
          box.children().eq(1).remove();

          // Check which order to append elements
          if (targetArea === AREAS.TOP || targetArea === AREAS.LEFT) {
            newWindow.appendTo(box);
            element.appendTo(box);
          } else {
            element.appendTo(box);
            newWindow.appendTo(box);
          }
          if (prev.length) {
            box.insertAfter(prev);
          } else {
            box.appendTo(parent);
          }
          // console.log('DOM DONE');
          $rootScope.$broadcast('ui.box.redraw', {});
        }
        event.stopPropagation();
        event.preventDefault();
        splitArea.hide();
      }

      // called when window is empty
      scope.destroyMe = function() {
        // console.log(element);
        // console.log(element.parent());
        var prev = element.prev();
        var parent = element.parent();
        // var parentPrev = parent.prev();
        // console.log(parentPrev);
        var newElement;
        if (parent.hasClass('splitbox')) {
          if (prev.hasClass('splitboxbox')) {
            newElement = prev;
          } else {
            newElement = element.next();
          }
          parent.replaceWith(newElement);
          newElement.css('width', '');
          newElement.css('height', '');
          newElement.css('top', '');
          newElement.css('left', '');
          setTimeout(function() {
            $rootScope.$broadcast('ui.box.redraw', {});
          });
        }
      }

      scope.headerDrop = function(event) { _drop(event, false); }

      element.bind('dragend', function(event) {
        splitArea.hide();
        if (event.originalEvent.dataTransfer.dropEffect !== 'none') { // successfully dropped?
          console.log('dropped successfully');
        }
      });

      headerContainer.bind('dragenter', function() {
        splitArea.hide();
      });

      // CONTAINER Event Handlers =======================================
      container.bind('drop', function(event) {
        _drop(event.originalEvent, true);
      });


      container.bind('dragenter', function(event) {
        for (var i = 0; i < event.originalEvent.dataTransfer.types.length; i++) {
          var type = event.originalEvent.dataTransfer.types[i];
          if (type === 'application/x-lx-window-pane') {
            event.stopPropagation();
            splitArea.show();
            return;
          }
        }
      });

      container.bind('dragover', function(e) {
        var event = e.originalEvent || e;
        var found = false;
        for (var i = 0; i < event.dataTransfer.types.length; i++) {
          var type = event.dataTransfer.types[i];
          if (type === 'application/x-lx-window-pane') {
            found = true;
            break;
          }
        }
        if (!found) return
        event.preventDefault();
        event.stopPropagation();
        var target = event.currentTarget;
        var bounds = target.getBoundingClientRect();
        var height = bounds.bottom - bounds.top;
        var width = bounds.right - bounds.left;
        var offset = container.offset();
        var area = getAreaFromEvent(event);

        switch (area) {
        case AREAS.TOP:
          splitArea.offset({
            top: offset.top,
            left: offset.left
          });
          splitArea.width(width);
          splitArea.height(height / 2);
          break;
        case AREAS.RIGHT:
          splitArea.offset({
            top: offset.top,
            left: offset.left + width / 2
          });
          splitArea.width(width / 2);
          splitArea.height(height);
          break;
        case AREAS.LEFT:
          splitArea.offset({
            top: offset.top,
            left: offset.left
          });
          splitArea.width(width / 2);
          splitArea.height(height);
          break;
        case AREAS.BOTTOM:
          splitArea.offset({
            top: offset.top + height / 2,
            left: offset.left
          });
          splitArea.width(width);
          splitArea.height(height / 2);
          break;
        default:
          break;
        }
      });
    }
  };
});
