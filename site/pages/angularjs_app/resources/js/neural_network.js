var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

function Perceptron(input, hidden, output)
{
    // create the layers
    var inputLayer = new Layer(input);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(output);

    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // set the layers
    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;


var myPerceptron = new Perceptron(2,3,1);
var myTrainer = new Trainer(myPerceptron);

myTrainer.XOR(); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

console.log(myPerceptron.activate([0,0])); // 0.0268581547421616
console.log(myPerceptron.activate([1,0])); // 0.9829673642853368
console.log(myPerceptron.activate([0,1])); // 0.9831714267395621
console.log(myPerceptron.activate([1,1])); // 0.02128894618097928

var canvas = null;
var ctx = null;

var mouse = {x:0,y:0};
var train = false;

var points = [
    {
        pos: {x:200,y:350},
        velocity: 1,
        direction: {x:0,y:0},
        network: new synaptic.Architect.Perceptron(20, 25, 25, 25, 2)
    },
    {
        pos: {x:150,y:100},
        velocity: 1,
        direction: {x:0,y:0},
        network: new synaptic.Architect.Perceptron(20, 25, 25, 25, 2)
    },
    {
        pos: {x:200,y:100},
        velocity: 1,
        direction: {x:0,y:0},
        network: new synaptic.Architect.Perceptron(20, 25, 2)
    },
    {
        pos: {x:250,y:100},
        velocity: 1,
        direction: {x:0,y:0},
        network: new synaptic.Architect.Perceptron(20, 25, 2)
    },
    {
        pos: {x:300,y:100},
        velocity: 1,
        direction: {x:0,y:0},
        network: new synaptic.Architect.Perceptron(20, 25, 2)
    }
];

function update(time, dt) 
{   
    var input = [];
    points.forEach(function(point) {
        input.push(point.pos.x / 400);
        input.push(point.pos.y / 400);
        input.push((point.direction.x + 1) * 0.5);
        input.push((point.direction.y + 1) * 0.5);
    }, this);

    var count = 0;
    points.forEach(function(point) {
        var output = point.network.activate(input);

        point.direction = {x:output[0] * 2 - 1, y:output[1] * 2 - 1};//output[0]
        if (count != 0) {
            point.pos = {
                x: point.direction.x * point.velocity + point.pos.x, 
                y: point.direction.y * point.velocity + point.pos.y
            }
        } else {
            point.pos = {
                //x: Math.cos(time * 0.0006) * 150 + 200, 
                //y: Math.sin(time * 0.0006) * 150 + 200
                x: mouse.x,
                y: mouse.y
            }
        }

        if (train) {
            var learningRate = .01;
            var target = targetDirection(point);
            point.network.propagate(learningRate, target);
        }

        count++;
    }, this);
}

function draw(time, dt)
{
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, .2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    

    points.forEach(function(point) {
        ctx.fillStyle="#f00";
        ctx.save();
            ctx.translate(point.direction.x * 1 + point.pos.x, point.direction.y * 1 + point.pos.y);
            ctx.beginPath();
                // ctx.arc( point.x, point.y, 2, 0, 2 * Math.PI);
                // ctx.fill();
                ctx.beginPath();
                ctx.moveTo(0, -4);
                ctx.lineTo(4, 0);
                ctx.lineTo(0, 4);
                ctx.lineTo(-4, 0);
                ctx.closePath();
                ctx.fill();
            ctx.closePath();
        ctx.restore();

        ctx.fillStyle="#000";
        ctx.save();
            ctx.translate(point.pos.x, point.pos.y);
            ctx.beginPath();
                // ctx.arc( point.x, point.y, 2, 0, 2 * Math.PI);
                // ctx.fill();
                ctx.beginPath();
                ctx.moveTo(0, -4);
                ctx.lineTo(4, 0);
                ctx.lineTo(0, 4);
                ctx.lineTo(-4, 0);
                ctx.closePath();
                ctx.fill();
            ctx.closePath();
        ctx.restore();
    }, this);
}

function targetDirection(point)
{
    var average_pos = {x:0,y:0};

    points.forEach(function(point) {
        average_pos.x += point.pos.x;
        average_pos.y += point.pos.y;
    }, this);

    average_pos.x /= 5;
    average_pos.y /= 5;

    var atan2 = Math.atan2((average_pos.y - point.pos.y), (average_pos.x - point.pos.x))

    return [(Math.cos(atan2) + 1) * 0.5, (Math.sin(atan2) + 1) * 0.5];
}


var last_time = 0;
function loop(cur_time)
{
    var dt = (cur_time - last_time) * 0.001;
    last_time = cur_time;

    //input();
    update(cur_time, dt);
    draw(cur_time, dt);

    window.requestAnimationFrame(loop);
}

$(document).ready(function() {
    canvas = document.getElementById("nn-canvas");
    ctx = canvas.getContext('2d');

    window.requestAnimationFrame(loop);
});

$(document).on('mousemove', function(e) {
    mouse = {x: e.clientX, y: e.clientY};
});

$(document).on('mousedown', function(e) {
    train = true;
    console.log('training');
});

$(document).on('mouseup', function(e) {
    train = false;
    console.log('stopped training');
});