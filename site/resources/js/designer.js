console.log('Designer Loaded');

var nodes = {
    'p': [
        'color',
        'font',
        'font-weight'
    ],
    'span': [
        'color',
        'font',
        'font-weight'
    ],
    'img': [
        'height'
    ]
};

console.log(nodes);

function openMenu(node)
{
    var nodeName = node.nodeName.toLowerCase();
    var options = getOptions(nodeName);
    createMenuOptions(options)
}

function createMenuOptions(options)
{
    
}

function getOptions(nodeName)
{
    //if (nodes.contains(nodeName))
    //{
        return nodes[nodeName];
    //}
    //else
    //    return null;
}

$(document).contextmenu(function(e) {

    var target = $(e.target)[0];
    var target_nodeName = target.nodeName.toLowerCase();

    console.log(e);
    console.log(target);
    console.log(target_nodeName);
    console.log(getOptions(target_nodeName));

    var menuContainer = $('<div class="designer-context-container"><div class="title">NodeName: ' + target_nodeName + '</div></div>');
    menuContainer.css('top', e.pageY);
    menuContainer.css('left', e.pageX);

    var options = getOptions(target_nodeName);

    if ('undefined' != typeof(options))
        getOptions(target_nodeName).forEach(element => {
            menuContainer.append($('<div class="option">' + element + '</div>'));
        });
    else
        menuContainer.append($('<p>No Options</p>'));

    $('body').append(menuContainer);

    e.preventDefault();
});
