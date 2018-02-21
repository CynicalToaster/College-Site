var app = angular.module('solarSystemMap.controllers', [])
.controller('solarSystemMapController', function($scope) {
    
    $scope.initMap = function() {
        var svg = d3.select('#map');
        var blades = [];
        var rotation = 0;


        createBlades('/site/resources/pole.svg');
        createBlades('/site/resources/blades.svg');
        createBlades('/site/resources/trail_1.svg').style("fill", "red");
        createBlades('/site/resources/pole.svg');
        createBlades('/site/resources/blades.svg');
        createBlades('/site/resources/trail_2.svg');
        createBlades('/site/resources/pole.svg');
        createBlades('/site/resources/blades.svg');
        createBlades('/site/resources/green_trails.svg');
        createBlades('/site/resources/pole.svg');
        createBlades('/site/resources/blades.svg');
        createBlades('/site/resources/blades.svg');
        createBlades('/site/resources/ObiWan-02.svg');
        createBlades('/site/resources/Light Sabre-01.svg');
        createBlades('/site/resources/Light Sabre-01.svg');


        function createBlades(svgUrl) {
            var blade = svg.append("image")
                        .attr("xlink:href",svgUrl)
                        .attr("width", 200)
                        .attr("height", 200)
            blades.push(blade);
            return blade;
        }
        


        var last_time = 0;
        function loop(cur_time)
        {
            var dt = (cur_time - last_time) * 0.001;
            last_time = cur_time;

            rotation -= dt * 90;
            for (var i = 0; i < blades.length; i+=3) {
                blades[i].attr("transform", "translate("+(i * 50 + 100)+",170) rotate("+0+") scale(0.6,0.6) translate(-100,-100)");
                blades[i + 1].attr("transform", "translate("+(i * 50 + 100)+",100) rotate("+rotation+") translate(-100,-100)");
                blades[i + 2].attr("transform", "translate("+(i * 50 + 100)+",100) rotate("+rotation+") translate(-100,-100)");
            }

            window.requestAnimationFrame(loop);
        }
        window.requestAnimationFrame(loop);
    }
})

.directive('map', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div style="width: 800px">' +
                '<svg id="map" style="border: 1px solid #f00" data-ng-init="initMap()" xmlns="http://www.w3.org/2000/svg" width="800" height="250">' +
                '</svg>' +
            '</div>'
    };
});
