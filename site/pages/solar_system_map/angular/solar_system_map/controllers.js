var app = angular.module('solarSystemMap.controllers', [])
.controller('solarSystemMapController', function($scope) {
    
    $scope.planet = {
        type: 'planet',
        position: [256,256],
        radius: 100,
        strokeWidth: 10,
        svgObject: null
    };
    
    $scope.initMap = function() {
        var svg = d3.select('#map');

        generatePlanet(svg, $scope.planet);

        function generatePlanet(svg, object) {
            var base = svg.append('g')
                .attr('transform', 'translate('+ object.position[0] +','+ object.position[1] +')')
                
            var defs = base.append('defs')
            
            // Surface Mask
            defs.append('clipPath')
                .attr('id', 'surfaceClip')
                .append('circle')
                .attr('r', object.radius)

            // Shadow Mask
            var shadowMask = defs.append('mask')
                .attr('id', 'shadowMask')
            shadowMask.append('rect')
                .attr('x', 0)
                .attr('y', -object.radius)
                .attr('width', object.radius)
                .attr('height', object.radius * 2)
                .style('fill', '#fff')
            shadowMask.append('ellipse')
                .attr('rx', object.radius * 0.2)
                .attr('ry', object.radius)
                .style('fill', '#000')


            // Surface
            base.append('circle')
                .attr('r', object.radius + object.strokeWidth * 0.5)
                .style('fill', '#7c3613')
                .style('stroke', '#49281e')
                .style('stroke-width', object.strokeWidth)

            var surface = base.append('g')
                .style('clip-path', 'url(#surfaceClip)')


            // Craters
            for (i = 0; i < randomRange(0,4); i++) {
                var size = randomRange(5,15);
                var maxDistance = object.radius - size - 10;

                var point = inCircle();
                var distance = length(point);

                surface.append('circle')
                    .attr('transform', 'translate('+ point[0] * maxDistance +','+ point[1] * maxDistance +')')
                    .attr('r', 15 - (distance * 10))
                    .style('fill', '#5a2814')         
            }

            for (i = 0; i < 20; i++) {
                var size = randomRange(1,5);
                var maxDistance = object.radius - size;

                var point = inCircle();
                var distance = length(point);

                surface.append('circle')
                    .attr('transform', 'translate('+ point[0] * maxDistance +','+ point[1] * maxDistance +')')
                    .attr('r', 5 - (distance * 4))
                    .style('fill', '#5a2814')         
            }


            // Ice Caps
            surface.append('circle')
                .attr('transform', 'translate(0,'+ -object.radius +') scale(1,0.25)')
                .attr('r', object.radius * 0.5)
                .style('fill', '#fff')
                .style('opacity', 0.8)

            surface.append('circle')
                .attr('transform', 'translate(0,'+ object.radius +') scale(1,0.25)')
                .attr('r', object.radius * 0.5)
                .style('fill', '#fff')
                .style('opacity', 0.8)


            // Shadow
            surface.append('circle')
                .attr('r', object.radius)
                .style('mask', 'url(#shadowMask)')
                .style('fill', '#000')
                .style('opacity', 0.4)


            svg.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', 500)
                .attr('height', 1)
                .style('fill', '#0f0')
            svg.append('rect')
                .attr('x', 0)
                .attr('y', 100)
                .attr('width', 500)
                .attr('height', 1)
                .style('fill', '#f00')
            svg.append('rect')
                .attr('x', 0)
                .attr('y', 200)
                .attr('width', 500)
                .attr('height', 1)
                .style('fill', '#0f0')

            for (i = 0; i < 40; i++) {
                var point = inCircle();
                var distance = length(point);
                svg.append('circle')
                    .attr('r', 5 - (distance * 4))
                    .attr('cx', 100 + (point[0]) * 100)
                    .attr('cy', 100 + (point[1]) * 100)
                    .style('fill', '#000')
            }
            
        }


        function particle() {
            var text = svg.insert("text", "rect")
                .html('$scope.logoText[randomRange(1, 6)]')
                .attr("font-family", 'Pacifico')
                .attr("font-size", randomRange(12, 24))
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
                .style("fill-opacity", 0)
                .remove();
            d3.event.preventDefault();
        }
    }
})

.directive('map', function($compile) {
    return {
        restrict: 'A',
        scope: true,
        template: 
            '<div class="row">' +
                '<svg id="map" style="border: 1px solid #f00" data-ng-init="initMap()" xmlns="http://www.w3.org/2000/svg" width="512" height="512">' +
                '</svg>' +
            '</div>',
    };
});
