var store_app = angular.module('solarSystemMap.controllers', [])
.controller('solarSystemMapController', function($scope) {

})

.directive('map', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div class="row" style="border: 1px solid #f00">' +
            '</div>',
    };
});