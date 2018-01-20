var store_app = angular.module('logoDesigner.controllers', [])
.controller('logoDesignerController', function($scope) {
    $scope.canvasSize = {x: 1920, y: 500};

    $scope.fonts = [
        'Supermercado One',
        'Risque',
        'Lobster',
        'Pacifico',
        'Comfortaa',
        'Righteous',
        'Permanent Marker',
        'Sacramento',
        'Tangerine',
        'Marck Script',
        'Monoton',
        'Homemade Apple',
        'Bad Script',
        'Sigmar One'
    ];
    //$scope.font = 'Monoton';

    $scope.logoText = [
        'Cynical',
        'CynicalToaster',
        'LogoDesigner',
        'SVG',
        'Rapanui',
        'Amazing'
    ];

    $scope

    $scope.saveLogo = function() {
        var svg = $('.logo-canvas .logo')[0];

        var a = document.createElement('a'), xml, ev;
        a.download = 'my_svg.svg'; // file name
        xml = (new XMLSerializer()).serializeToString(svg); // convert node to xml string
        a.href = 'data:application/octet-stream;base64,' + btoa(xml); // create data uri
        // <a> constructed, simulate mouse click on it
        ev = document.createEvent("MouseEvents");
        ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(ev);
    }
    
    $scope.random = function(min, max) {
        return Math.floor((Math.random() * ((max - min) + 1)) + min);
    }

    $scope.test = function(svgName) {
        var width = Math.max(960, innerWidth),
        height = Math.max(500, innerHeight);

        var i = 0;
        
        m = [0,0];
        pm = [0,0];

        var svg = d3.select(svgName);
        //var svg = d3.select(".logo-canvas .logo")
        //    .attr("width", width)
        //    .attr("height", height);

        svg.on("ontouchstart" in document ? "touchmove" : "mousemove", particle);

        function particle() {
            pm = m;
            m = d3.mouse(this);
            var dm = [(m[0] - pm[0]) * 10,(m[1] - pm[1]) * 10];
            dm[0] += $scope.random(-100,100);
            dm[1] += $scope.random(-100,100);

            var text = svg.insert("text", "rect")
                .html($scope.logoText[$scope.random(1, 6)])
                .attr("font-family", $scope.font)
                .attr("font-size", $scope.random(12, 24))
                .attr("x", m[0])
                .attr("y", m[1])
                .style("fill", d3.hsl((i = (i + 1) % 360), 1, .5))
                .style("fill-opacity", 1)

                .transition()
                .duration(2000)
                .ease(Math.sqrt)

                .attr("x", m[0] + dm[0])
                .attr("y", m[1] + dm[1])
                .attr("r", 100)
                .style("fill-opacity", 0.5)
                //.remove();

            //console.log(text);
            d3.event.preventDefault();
        }
    }

    $scope.test2 = function() {
        console.log($scope.font);
    }

    $scope.searchText = 'Test';
    $scope.check = function () {
      console.log($scope.searchText);
    };
})

.directive('logoDesigner', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div class="logo-designer">' +
                '<div class="header">' +
                    '<div class="close"><i class="fa fa-times"></i></div>' +
                    '<h4><strong>Logo Designer</strong></h4>' +
                '</div>' +
                '<div class="content">' +
                    '<div data-toolbox></div>' +
                    '<div data-canvas></div>' +
                '</div>' +
            '</div>'
    };
})

.directive('toolbox', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div class="logo-toolbox" style="display: none;">' +
                '<a href="#"><i class="fa fa-bars" aria-hidden="true"></i></a>' +
                '<div>' +
                    '<button data-ng-click="saveLogo()">Save Logo</button>' +
                    '<button data-ng-click="test2()">{{$scope.font}}</button>' +
                    '<select data-ng-model="$scope.font" data-ng-options="o for o in fonts"></select>' +
                    '<input type="text" ng-model="$scope.searchText" />' +
                    '<button ng-click="check()">{{ $scope.searchText }}</button>' +
                '</div>' +
            '</div>'
    };
})

.directive('canvas', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div class="logo-canvas">' +
                '<svg class="logo" data-ng-init="test(\'.logo-canvas .logo\')" xmlns="http://www.w3.org/2000/svg" width="{{canvasSize.x}}" height="{{canvasSize.y}}">' +
                    '<defs><style>' +
                        '@import url(https://fonts.googleapis.com/css?family=Bad+Script|Comfortaa|Homemade+Apple|Lobster|Marck+Script|Monoton|Pacifico|Permanent+Marker|Righteous|Risque|Sacramento|Sigmar+One|Supermercado+One|Tangerine);' +
                    '</style></defs>' +
                '</svg>' +
                '<svg class="overlay" data-ng-init="test(\'.logo-canvas .overlay\')" xmlns="http://www.w3.org/2000/svg" width="{{canvasSize.x}}" height="{{canvasSize.y}}">' +
                    '<defs><style>' +
                        '@import url(https://fonts.googleapis.com/css?family=Bad+Script|Comfortaa|Homemade+Apple|Lobster|Marck+Script|Monoton|Pacifico|Permanent+Marker|Righteous|Risque|Sacramento|Sigmar+One|Supermercado+One|Tangerine);' +
                    '</style></defs>' +
                '</svg>' +
            '</div>'
    };
});