var store_app = angular.module('product.controllers', [])
.controller('productController', function($scope) {
    $scope.test = [
        {
            name: 'Header 1',
            content: 'test123123'
        },
        {
            name: 'Header 2',
            content: 'test123123test123123test123123test123123test123123test123123test123123'
        },
        {
            name: 'Header 3',
            content: 'test123123'
        },
        {
            name: 'Header 4',
            content: 'test123123test123123test123123test123123'
        }
    ]
})

.directive('ngAccordian', function($compile) {
    return {
        restrict: 'A',
        scope: {
            
        },
        link: function(scope, el, attrs) {
            el.find('.accordian-header').click(function() {
                el.parent().find('.accordian-content').not($(this).siblings()).css('height', 0);
                var content = $(this).siblings('.accordian-content');
                content.css('height', content.find('.accordian-content-inner').outerHeight());
            });
        }
    };
})
