var store_app = angular.module('modular_design.core', [])
.controller('core_controller', function($scope) {
    $scope.content = [
        {
            type: 'list',
            title: 'Printing Services',
            links: [
                {text: 'Volume Screen Print 50+ Items', href: '/screen-printing-uk/'},
                {text: 'Digital (DTG) 1-50 Items', href: '/dtg-printed-clothing-supplier-uk/'},
                {text: 'Design and Order Online', href: '/custom-clothing/'},
                {text: 'Print On Demand Fulfillment', href: 'https://teemill.com/'},
                {text: 'Artwork Templates &amp; Advice', href: '/screen-printing-t-shirt-artwork-requirements/'},
                {text: 'Sample Prints', href: '/product/refundable-print-quality-sample/'},
                {text: 'Our Range', href: '/view-our-range/'}
            ],
            position: {x:0,y:0},
            size: {x:1,y:1}
        },
        {
            type: 'list',
            title: 'Blog',
            links: [
                {text: 'All Posts', href: '/blog/'},
                {text: 'Custom Printing', href: '/blog/uktsp-custom-printing/'},
                {text: 'Help &amp; Advice', href: '/blog/uktsp-help-advice/'},
                {text: 'Organic Products', href: '/blog/uktsp-organic-clothing/'},
                {text: 'Saving Money', href: '/blog/uktsp-saving-money/'}
            ],
            position: {x:1,y:0},
            size: {x:1,y:1}
        },
        {
            type: 'image',
            title: 'Design Online',
            img_url: '/site/resources/images/backgrounds/background_'+ (Math.floor(Math.random() * 18) + 1) +'.jpg',
            href: '/test/',
            position: {x:2,y:0},
            size: {x:1,y:1}
        },
        {
            type: 'image',
            title: 'Design Online',
            img_url: '/site/resources/images/backgrounds/background_'+ (Math.floor(Math.random() * 18) + 1) +'.jpg',
            href: '/test/',
            position: {x:3,y:0},
            size: {x:1,y:1}
        }
    ];
})

.directive('contentBlock', function($compile) {
    return {
        //restrict: 'E',
        scope: {
            data: '=',
        },
        template: 
            '<div data-ng-switch="data.type">' +
                '<div data-ng-switch-when="list"><div data-cb-type-list data="data"></div></div>' +
                '<div data-ng-switch-when="image"><div data-cb-type-image data="data"></div></div>' +
            '</div>',
    };
})

.directive('cbTypeList', function($compile) {
    return {
        //restrict: 'R',
        scope: {
            data: '=',
        },
        template: 
            '<p>{{data.title}}</p>' +
            '<ul>' +
                '<li data-ng-repeat="(id, link) in data.links"><a href="{{link.href}}" title="{{link.text}}" class="title">{{link.text}}</a></li>' +
            '</ul>',
    };
})

.directive('cbTypeImage', function($compile) {
    return {
       // restrict: 'R',
        scope: {
            data: '=',
        },
        template: 
            //'<img src="{{data.img_url}}" />' +
            '<a href="{{data.href}}">' +
                '<div class="img" style="background-image: url(\'{{data.img_url}}\');"></div>' +
                '<div class="caption" href="{{data.href}}"><strong>{{data.title}}</strong></div>' +
            '</a>',
    };
});
