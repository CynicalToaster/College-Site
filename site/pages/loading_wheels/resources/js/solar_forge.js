class SolarForge {
    constructor() {
        this.seed
    }

    seededRandom = function(max, min) {
        max = max || 1;
        min = min || 0;
     
        Math.seed = (Math.seed * 9301 + 49297) % 233280;
        var rnd = Math.seed / 233280;
     
        return min + rnd * (max - min);
    }
}

class Planet {
    constructor() {

    }
}

class PlanetRings {
    constructor() {

    }
}

SolarForge = {

    materials: {
        iron: {
            colours: [
                '#5a2814',
                '#7c3613',
                '#776D64',
                '#605953',
                '#524B45',
                '#BAAA98',
                '#534C46',
                '#544B3C'
            ]
        },
        ice: {
            colours: [
                '#D2E6F9',
                '#B0D8F0',
                '#E2F1FF',
                '#C3D7EA',
                '#D5DFE7'
            ]
        },
        silicate: {
            colours: [

            ]
        },
        water: {
            colours: [

            ]
        },
        hydrogen: {
            colours: [

            ]
        }
    },

    planetTemplate: {
        mass: 10,
        density: 1,
        radius: 100,
        temperature: 100,
        materials: [
            'iron'
        ],

        hasRings: true,
        rings: {
            innerRadius: 150,
            outerRadius: 250,
            materials: [
                {'name': 'iron', 'weight': 0.25},
                {'name': 'ice', 'weight': 0.75},
            ]
        },

        hasAtmosphere: false,
        atmosphere: {
            density: 1,
            materials: [
                
            ]
        }
    },


    generatePlanet: function(svg, position, properties) {
        var strokeWidth = 10;

        var base = svg.append('g')
            .attr('transform', 'translate('+ position[0] +','+ position[1] +')')
            
        var defs = base.append('defs')
        
        // Surface Mask
        defs.append('clipPath')
            .attr('id', 'surfaceClip')
            .append('circle')
            .attr('r', properties.radius)

        // Shadow Mask
        var shadowMask = defs.append('mask')
            .attr('id', 'shadowMask')
        shadowMask.append('rect')
            .attr('x', 0)
            .attr('y', -properties.radius)
            .attr('width', properties.radius)
            .attr('height', properties.radius * 2)
            .style('fill', '#fff')
        shadowMask.append('ellipse')
            .attr('rx', properties.radius * 0.2)
            .attr('ry', properties.radius)
            .style('fill', '#000')

        // Rings Mask
        var ringsMask = defs.append('mask')
            .attr('id', 'ringsMask')
        ringsMask.append('circle')
            .attr('r', properties.rings.outerRadius)
            .style('fill', '#fff')
        ringsMask.append('circle')
            .attr('r', properties.rings.innerRadius)
            .style('fill', '#000')


        // Surface
        base.append('circle')
            .attr('r', properties.radius + strokeWidth * 0.5)
            .style('fill', SolarForge.getRandomMaterialColour(SolarForge.materials.iron))
            .style('stroke', '#49281e')
            .style('stroke-width', strokeWidth)

        var surface = base.append('g')
            .style('clip-path', 'url(#surfaceClip)')


        // Craters
        for (i = 0; i < randomRange(0,4); i++) {
            var size = randomRange(5,15);
            var maxDistance = properties.radius - size - 10;

            var point = inCircle();
            var distance = length(point);

            surface.append('circle')
                .attr('transform', 'translate('+ point[0] * maxDistance +','+ point[1] * maxDistance +')')
                .attr('r', 15 - (distance * 10))
                .style('fill', '#5a2814')       
        }

        for (i = 0; i < 20; i++) {
            var size = randomRange(1,5);
            var maxDistance = properties.radius - size;

            var point = inCircle();
            var distance = length(point);

            surface.append('circle')
                .attr('transform', 'translate('+ point[0] * maxDistance +','+ point[1] * maxDistance +')')
                .attr('r', 5 - (distance * 4))
                .style('fill', '#5a2814')        
        }


        // Ice Caps
        surface.append('circle')
            .attr('transform', 'translate(0,'+ -properties.radius +') scale(1,0.25)')
            .attr('r', properties.radius * 0.5)
            .style('fill', '#fff')
            .style('opacity', 0.6)

        surface.append('circle')
            .attr('transform', 'translate(0,'+ properties.radius +') scale(1,0.25)')
            .attr('r', properties.radius * 0.5)
            .style('fill', '#fff')
            .style('opacity', 0.6)


        // Shadow
        surface.append('circle')
            .attr('r', properties.radius)
            .style('mask', 'url(#shadowMask)')
            .style('fill', '#000')
            .style('opacity', 0.4)


        SolarForge.generateRings(base, properties)
    },

    generateRings: function(parent, properties) {
        var ringsBase = parent.append('g')
            .style('opacity', 0.6 )
            .style('mask', 'url(#ringsMask)')

        var defs = ringsBase.append('defs')


        // Shadow Mask
        var shadowMask = defs.append('mask')
            .attr('id', 'ringShadowMask')
        shadowMask.append('rect')
            .attr('x', 0)
            .attr('y', -properties.radius)
            .attr('width', properties.rings.outerRadius)
            .attr('height', properties.radius * 2)
            .style('fill', '#fff')

        var currentRadius = properties.rings.outerRadius;

        do {
            ringsBase.append('circle')
                .attr('r', currentRadius)
                .style('fill', increase_brightness(SolarForge.getRandomMaterialColour(SolarForge.materials.iron), 20))

            currentRadius -= Math.abs(gaussianRand(6)) * 10 + 2;
        } while (currentRadius > properties.rings.innerRadius);


        // Shadow
        ringsBase.append('circle')
            .attr('r', properties.rings.outerRadius)
            .style('mask', 'url(#ringShadowMask)')
            .style('fill', '#000')
            .style('opacity', 0.4)
    },

    getRandomMaterial: function(materialNames) {
        return SolarForge.materials[randomRange(0,materials.length - 1)];
    },

    getRandomMaterialColour: function(material) {
        return material.colours[randomRange(0, material.colours.length - 1)];
    },


    getMaterialColour: function(materialName) {
        var material = SolarForge.materials[materialName]
        return material.colours[randomRange(0,material.colours.length - 1)];
    },

    generateDebugRing: function(parent, ringProperties) {

        var width = ringProperties.outerRadius - ringProperties.innerRadius;
        var materials = ringProperties.materials;

        var debugRing = parent.append('g')
            .attr('transform', 'translate(10,10)')

        debugRing.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', 1)
            .style('fill', '#fff')

        var currentX = 0;
        // for (var material in materials) {
        //     if (materials.hasOwnProperty(material)) {
        //         var materialWeight = materials[material];
        //         var materialWidth = width * materialWeight;
                                
        //         
        //     }
        // }





        var currentX = 0;
        var maxSegmentWidth = 40;
        var minSegmentWidth = 20;

        
        var materialsLeft = width;
        var materialsComposition = [];

        for (i = 0; i < materials.length; i++) {
            var material = materials[i];
            materialsComposition.push({'name': material.name, 'amount': material.weight * width});
        }

        console.log(materialsComposition);

        do {

            var randomMaterial = materialsComposition[randomRange(0,materialsComposition.length - 1)];
            if (randomMaterial.amount > 0) {
                console.log(randomMaterial);
                
                var materialWidth = Math.min(randomRange(minSegmentWidth, maxSegmentWidth), randomMaterial.amount);
                randomMaterial.amount -= materialWidth;
                materialsLeft -= materialWidth;

                debugRing.append('rect')
                    .attr('x', currentX)
                    .attr('y', 1)
                    .attr('width', materialWidth)
                    .attr('height', 10)
                    .style('fill', SolarForge.getMaterialColour(randomMaterial.name))

                currentX += materialWidth;

            }

        } while (materialsLeft > 0);
        
    }
}