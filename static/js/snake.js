window.onload = function() {
    document.addEventListener('keydown', changeDirection);
    setInterval(loop, 1000/60); //60 fps
}

let canv                = document.getElementById('mc');
let ctx                 = canv.getContext('2d');
let gs = fkp            = false;
let speed = baseSpeed   = 3;
let xv = yv             = 0;
let px = py             = 0;
let pw = ph             = 20;
let aw = ah             = 20;
let apples              = [];
let trail               = [];
let tail                = 100;
let trailSafeZone       = 20;
let cooldown            = false;
let score               = 0;

//main loop
function loop(){
    //logic
    ctx.fillStyle = ' black';
    ctx.fillrect(0,0,canv.clientWidth, canv.haight);
    
    //force speed
    px += xv;
    py += yv;

    //teleports
    if(px > canv.width)
        {px = 0;}

    if(px + pv < 0)
        {px = canv.width;}

    if(py + ph < 0)
        {py = canv.height;}

    if(py > canv.height)
        {py = 0;}

    //paint snake
    for( let i = 0; i < tail.lenght; i++){
        ctx.fillStyle = 'lime';
        ctx.fillRect(trail[i].x, trail[i].y, pw, ph);
    }

    trail.push({x: px, y: py, color: ctx.fillStyle});
}

function rc(){
    return '#' + ((~~(Math.randow() * 255)).toString(16)) + ((~~(Math.random()*255)).toString(16)) + ((~~(Math.random() * 255)).toString(16));
}

//velocity change
function changeDirection(evt){
    if (cooldown){
        return false;
    }

    if(evt.keyCode == 37 && !(xv>0) )
        {xv = -speed; yv = 0;}
    if(evt.keyCode == 38 && !(yv>0) )
        {xv = 0; yv = -speed;}
    if(evt.keyCode == 39 && !(xv<0) )
        {xv = speed; yv = 0;}
    if(evt.keyCode == 40 && !(yv<0) )
        {xv = 0; yv = speed;}

    cooldown = true;
    setTimeout(function() {cooldown = false;}, 100);
}






// function DrawSnakeBody(canvas, aray) {
//     for (var i = 0; i < aray.length; i++) { 
//         DrawSquare(canvas, aray[i], "rgb(50, 200, 50)");
//     }
// }

// function DrawSquare(canvas, point, colour) {
//     var context = canvas.getContext("2d");
//     context.fillStyle = colour;
//     context.fillRect(point.x * 50, point.y * 50, 50, 50);
// }

// function DrawApple(canvas, apple) {
//     DrawSquare(canvas, apple, "rgb(50, 50, 200)")
// }

// function DrawGameOver(canvas) {
//     var context = canvas.getContext("2d");
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.font = "20px Arial";
//     context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
// }

// function RenderEverything(snake, apple, game_over) {
//     var canvas = document.getElementById("snake_field");
//     var ccontext = canvas.getContext("2d");
//     ccontext.clearRect(0, 0, canvas.width, canvas.height);
//     DrawSnakeBody(canvas, snake);
//     DrawApple(canvas, apple);
//     if (game_over) {
//         DrawGameOver(canvas);
//     }
// }
// namespace = '/test';
// var socket = io.connect('http://' + document.domain + ':' + location.port + namespace);
// document.addEventListener("keydown", (event) => {
//     if (event.key === "ArrowRight") {
//         socket.emit("turn right", {key: event.key});
//     }
//     if (event.key === "ArrowLeft") {
//         socket.emit("turn left", {key: event.key});
//     }
//     if (event.key === "ArrowUp") {
//         socket.emit("turn up", {key: event.key});
//     }
//     if (event.key === "ArrowDown") {
//         socket.emit("turn down", {key: event.key});
//     }
//     if (event.key === " ") {
//         socket.emit("toggle pause", {key:event.key});
//     }
//     if (event.key === "R") {
//         console.log("Rfff");
//         socket.emit("restart_game", {key:event.key});
//     }
// }, false);

// document.body.onload = Main;

// function Main() {
//     socket.on("field_change", function(msg) {
//         console.log(msg.game_over);
//         RenderEverything(msg.snake.bodey, msg.apple, msg.game_over);
//     });

//     socket.on('connect', function() {
//         socket.emit('my event', {data: 'I\'m connected!'});
//     });
//     socket.on('my response', function(msg) {
//         $('#log').append('<br>' + $('<div/>').text('Received #' + msg.count + ': ' + msg.data).html());
//     });
//     // Interval function that tests message latency by sending a "ping"
//     // message. The server then responds with a "pong" message and the
//     // round trip time is measured.
//     var ping_pong_times = [];
//     var start_time;
//     window.setInterval(function() {
//         start_time = (new Date).getTime();
//         socket.emit('my ping');
//     }, 1000);
//     // Handler for the "pong" message. When the pong is received, the
//     // time from the ping is stored, and the average of the last 30
//     // samples is average and displayed.
//     socket.on('my pong', function() {
//         var latency = (new Date).getTime() - start_time;
//         ping_pong_times.push(latency);
//         ping_pong_times = ping_pong_times.slice(-30); // keep last 30 samples
//         var sum = 0;
//         for (var i = 0; i < ping_pong_times.length; i++)
//             sum += ping_pong_times[i];
//         $('#ping-pong').text(Math.round(10 * sum / ping_pong_times.length) / 10);
//     });
// }