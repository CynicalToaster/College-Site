gridLayout = {
    classes: {
        container: '.grid-container',
        content_block: '.grid-content-block'
    },

    mouse: {
        holding: null,
        holdingOffset: [0,0]
    },

    gridContainers: [],
    gridContentBlocks: [],

    init: function() {
        console.log('Grid Init');
        var containers = $(this.classes.container);
        for (i = 0; i < containers.length; i++) {
            this.initContainer($(containers[i]));
        }

        $(window).mousemove(function(e) {
            if (gridLayout.mouse.holding) {
                gridLayout.mouse.holding.offset({left: e.pageX + gridLayout.mouse.holdingOffset[0], top: e.pageY + gridLayout.mouse.holdingOffset[1]});
            }
        });
    },

    initContainer: function(containerObject) {
        //console.log('Container Init');
        //this.gridContainers.push(new container(containerObject));
        //console.log(this.gridContainers);

        var blocks = $(this.classes.content_block);
        for (i = 0; i < blocks.length; i++) {
            this.initBlock($(blocks[i]));
        }
    },


    initBlock: function(blockObject) {
        blockObject.mousedown(function(e) {
            if (!gridLayout.mouse.holding) {
                gridLayout.mouse.holding = blockObject;
                gridLayout.mouse.holdingOffset = [
                    blockObject.offset().left - e.pageX,
                    blockObject.offset().top - e.pageY
                ];
                blockObject.addClass('holding');
                console.log('Grabbed');
            } else {

            }
        });

        blockObject.mouseup(function(e) {
            if (gridLayout.mouse.holding = blockObject) {
                gridLayout.mouse.holding = null;
                blockObject.removeClass('holding');
                console.log('Dropped');
            }
        });

        this.gridContentBlocks.push(blockObject);
    }
}