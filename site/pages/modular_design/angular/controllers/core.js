var store_app = angular.module('modular_design.core', [])
.controller('core_controller', function($scope) {
    $scope.grid = {
        taken: {},
        availible: {},
        blocks: {},
        holding: {
            object: null,
            offset: [0,0]
        }
    };

    $scope.grab = function(e) {

    }

    $scope.drop = function(e) {

    }

    $scope.move = function(e) {
        if ($scope.grid.holding) {
            console.log('Holding something');
        } else {
            console.log('Not holding anything');
        }
    }
})

.directive('mdContainer', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div ng-mousemove="move($event)" ng->' +
                '<div><p>Test</p></div>' +
            '</div>',
    };
});