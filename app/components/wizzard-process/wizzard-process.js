'use strict';

var wpModule = angular.module('wizzardProcess', []);

wpModule.controller('WizzardProcessController', ['$scope', '$http', function($scope, $http) {
  var self = $scope;
  $http.get('data/wizzard-process-structure.json').then(function(response) {
        self.processDefinition = response.data;
  });
}]);

wpModule.directive('wizzardProcess', function() {
  return {
    templateUrl: 'components/wizzard-process/wizzard-process.html'
  };
});

wpModule.directive("proceedToStep", function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            //On click
            $(elem).click(function() {
              var thisjQuery = jQuery(this);
            	var idx = thisjQuery.index();
            	var item = thisjQuery.parents('div.wizzardprocessCallouts');
            	//alert("this.id="+this.id+" index="+idx+"item.id="+item.attr('id')+" item.class="+item.attr('class')+" item="+item);
            	var panels = jQuery('div.panel', item);
            	jQuery.each(panels, function (index, value) {
            		var panel = jQuery(this);
            		if(index==idx) {
            			panel.addClass('active');
            		} else {
            			panel.removeClass('active');
            		}
            		var n = index-idx;
            		panel.css('left', n*100+"%");
            	});
            	var indicator = jQuery('span.indicator', item);
            	if(idx==0) {
            		indicator.removeClass('hasPrev');
            	} else {
            		indicator.addClass('hasPrev');
            	}
            	if(idx==panels.length-1) {
            		indicator.removeClass('hasNext');
            	} else {
            		indicator.addClass('hasNext');
            	}
            	indicator.css('left', 100.0*idx/(panels.length-1)+"%");
            	indicator.text(idx+1);
            });
        }
    }
});
