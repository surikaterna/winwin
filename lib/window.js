var angular = require('angular');
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
		if(panes.length > 0) {
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


function _getPane(paneData, paneResolverService) {
	paneId = paneData.id;
	var newPane;
	if(paneId) {
		var sourcePane = $('#'+ paneId);
		var sourceContentPane = $('#'+ paneId+"-content");
/*		console.log(sourcePane);
		return sourcePane;
*/		
		var scp = angular.element(sourceContentPane).scope().pane;
		newPane = angular.element('<pane caption="' + scp.caption + '"></pane>');
		newPane.append(sourceContentPane.contents());
		setTimeout(function() {
			scp.$destroy();
			sourcePane.remove();
		},0);
	} else {
		newPane = paneResolverService.resolve(paneData);
	}
	return newPane;
}


//

module.directive('window', function ($compile, paneResolverService, $rootScope) {
      return {
		restrict: 'E',
		replace: true,
		transclude: true,
		require:'window',
		scope: {
			
		},
		template: '<div class="window"><div class="window-header" ui-transclude ui-droppable ui-drop-accepts="application/x-lx-window-pane" on-drop="headerDrop(event)"></div><div class="window-content"><div ng-repeat="pane in panes" ng-show="pane.active" pane-content-transclude="pane" id="{{id}}-content"></div></div>',
		controllerAs: 'vm',
		controller: 'WindowController',
		link:  function(scope, element, attr, windowController) {
			var self = this;
			function createPane(caption) {
					var newPane = $('<pane caption="'+caption+'"></pane>');
					var childScope = scope.$new(true);
					$compile(newPane)(childScope, undefined, {window: windowController});					
					return newPane;
			}

			var splitArea = $('body').children('.splitdroparea');
			if(!splitArea.length) {
				splitArea = $('<div class="splitdroparea" style="display:none;"></div>');
				splitArea.appendTo($('body'));
			}
			var headerContainer = element.children('.window-header');
			var container = element.children('.window-content');
			function _drop(event, split) {
				var paneString = event.dataTransfer.getData('application/x-lx-window-pane');
				var paneData = angular.fromJson(paneString);
				var newPane = _getPane(paneData, paneResolverService);
				if(!newPane) {
					return;
				}
				//just add to this window
				if(!split) {
					newPane.appendTo(headerContainer);
					$compile(newPane)(scope.$new(true), undefined, {window:windowController});
					/*if(paneData.id) {
						scp.$destroy();
						sourcePane.remove();
					}*/
				} else {
					var targetArea = getAreaFromEvent(event);
					console.log(targetArea);
					var box = angular.element('<hbox><div></div><div></div></hbox>');
					var newWindow = $compile('<window></window>')(scope.$new(true), undefined,{});	
					newPane.appendTo(newWindow.children('.window-header'));
					$compile(newPane)(scope.$new(true), undefined, {window:windowController});
					$compile(box)(scope.$new(true), undefined, {});
					console.log(box);
					var parent = element.parent();
					console.log(parent);
					var prev = element.prev();
					box.children().eq(1).replaceWith(newWindow);
					box.children().eq(2).remove();
					element.appendTo(box);
					//element.wrap(box);
					box.insertAfter(prev);
					//element.detach();
					//element.replaceWith(box);

					//parent.get().replaceChild(box.get(), element.get());
					//box.children().eq(2).remove();
					//element.appendTo(box);
					//box.children('#dummy').append(element);
					$rootScope.$broadcast('ui.box.redraw', {});

				}
				event.stopPropagation();
				event.preventDefault();
				splitArea.hide();
			}

			headerContainer.bind('dragenter', function(event) {
				splitArea.hide();
			});

			container.bind('drop', function(event) {
				_drop(event.originalEvent, true);
			});
			scope.headerDrop = function(event) {
				_drop(event, false);
			}			
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

			container.bind('dragover', function(event) {
				event = event.originalEvent || event;
				var found = false;
				for(var i=0;i<event.dataTransfer.types.length;i++) {
					var type = event.dataTransfer.types[i];
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

    var posY = event.clientY - bounds.top;
    var posX = event.clientX - bounds.left;

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
