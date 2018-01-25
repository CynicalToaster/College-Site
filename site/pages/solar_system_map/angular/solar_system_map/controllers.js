var app = angular.module('solarSystemMap.controllers', [])
.controller('solarSystemMapController', function($scope) {
    
    $scope.planet = {
        type: 'planet',
        position: [256,256],
        radius: 100,
        strokeWidth: 10,
        svgObject: null
    };

    $scope.info = {
        planetCount: 0,
        objectCount: 0
    }

    $scope.templateData = {
        mass: 100,
        density: 10,
        temperature: 100,
        materials: {
            
        },
        hasRings: false,
        rings: {
            innerRadius: 10,
            outerRadius: 50,
            materials: {

            }
        },
        hasAtmosphere: false,
        atmosphere: {
            density: 1,
            materials: {
                
            }
        }
    }
    
    $scope.initMap = function() {
        var svg = d3.select('#map')
            .style('background-color', '#000');

        var planetProperties = SolarForge.planetTemplate;

        SolarForge.generatePlanet(svg, [256,256], planetProperties);

        SolarForge.generateDebugRing(svg, planetProperties.rings);

        // svg.on("ontouchstart" in document ? "touchmove" : "mousemove", mouseMove);

        // function mouseMove() {
        //     var m = d3.mouse(this);
        //     $scope.planet.position = m;
        //     generatePlanet(svg, $scope.planet);

        //     console.log($scope.info);
        // }

        // function particle() {
        //     var text = svg.insert("text", "rect")
        //         .html('$scope.logoText[randomRange(1, 6)]')
        //         .attr("font-family", 'Pacifico')
        //         .attr("font-size", randomRange(12, 24))
        //         .attr("x", m[0])
        //         .attr("y", m[1])
        //         .style("fill", d3.hsl((i = (i + 1) % 360), 1, .5))
        //         .style("fill-opacity", 1)
        //         .transition()
        //         .duration(2000)
        //         .ease(Math.sqrt)
        //         .attr("x", m[0] + dm[0])
        //         .attr("y", m[1] + dm[1])
        //         .attr("r", 100)
        //         .style("fill-opacity", 0)
        //         .remove();
        //     d3.event.preventDefault();
        // }
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
            '</div>'
    };
});
