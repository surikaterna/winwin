var angular = require('angular');
var module = angular.module('ui.winwin');

windowController.$inject = ['$scope'];

function windowController($scope) {
	var ctrl = this;
	var panes = ctrl.panes = $scope.panes = [];
	ctrl.select = function(selectedPane) {
		console.log("select " + selectedPane.id + " || " + selectedPane.caption);
		console.log(ctrl);
		angular.forEach(panes, function(pane) {
			console.log(pane);
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
		console.log('REMOVE PANE' + pane.caption);
		console.log(pane);
		var index = panes.indexOf(pane);
		/*if(pane.active && panes.length > 1) {
			 var newActiveIndex = index == panes.length - 1 ? index - 1 : index + 1;
			ctrl.select(panes[newActiveIndex]);
		}*/
		panes.splice(index, 1);
		ctrl.select(panes[0]);
	}
	ctrl.createPane = function(caption, content) {
		
	}
}


module.controller('WindowController', windowController);


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
					$compile(newPane)(childScope, undefined, {window: windowController});					
					return newPane;
			}

			scope.add = function() {
				console.log('### NEW');
					var pane = createPane('**new**');
					pane.appendTo(container);
					pane.html('test');
			};


			var splitArea = $('body').children('.splitdroparea');
			if(!splitArea.length) {
				splitArea = $('<div class="splitdroparea" style="display:none;"></div>');
				splitArea.appendTo($('body'));
				console.log("adding splitArea");
			}
			var headerContainer = element.children('.window-header');
			var container = element.children('.window-content');

			container.bind('drop', function(event) {
				console.log('drop');
				console.log(event);
				var paneId = event.originalEvent.dataTransfer.getData('application/x-lx-window-pane');
				console.log('*** Dropped Pane: ' + paneId);
	
				var area = getAreaFromEvent(event);
				var sourcePane = $('#'+ paneId);
				var sourceContentPane = $('#'+ paneId+"-content");
				console.log(sourcePane);
				var scpO = angular.element(sourcePane).scope();
				console.log(scpO);
				var scp = scpO.$$childHead;
				console.log(scp);
				var newPane = angular.element('<pane caption="test"></pane>');
				
				//newPane.empty();
				//sourceContentPane.children().appendTo(newPane);
				newPane.append(sourceContentPane.contents());
				$compile(newPane)(scope.$new(true), undefined, {window: windowController});
				newPane.appendTo(headerContainer);
				console.log(newPane);
				scpO.$destroy();
				sourcePane.remove();
				event.stopPropagation();
				event.preventDefault();
				splitArea.hide();
			});
			element.bind('dragend', function(event) {
				console.log('dragend');
				console.log(event);
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