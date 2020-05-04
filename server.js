var MPPClient = require('mpp-client-xt');
var client = new MPPClient("http://www.multiplayerpiano.com");
var fs = require('fs');

client.start();

function chat(string) {
    client.sendArray([{m:'a', message:string}]);
}

client.on("hi", () => {
    client.setChannel("✧𝓡𝓟 𝓡𝓸𝓸𝓶✧");
});

var statsj = fs.readFileSync("stats.json");
var stats = JSON.parse(statsj);
console.log(stats);
var toggle = true;

client.on("a", (msg) => {
    let args = msg.a.split(' ');
    let cmd = args[0].toLowerCase();
    let argcat = msg.a.substring(cmd.length).trim();

    switch (cmd) {
        case "dvd!help":
            chat("Commands: dvd!help | dvd!about | dvd!stats | dvd!toggle");
            break;
        case "dvd!about":
            chat("This bot was made by Hri7566.");
            break;
        case "dvd!stats":
            chat(`Edge hits: ${stats.edgehits} | Corner hits: ${stats.cornerhits}`);
            break;
        case "dvd!toggle":
            if (toggle == true) {
                toggle = false;
                chat("The DVD cursor is now hidden.")
            } else if (toggle == false) {
                toggle = true;
                chat("The DVD cursor is no longer hidden.");
            }
            break;
    }
});

var pos = {x: Math.floor(Math.random()*100), y: Math.floor(Math.random()*100)};
var vel = {x: 2/5, y: 2/7};

var cursor = setInterval(function() {
    if (pos.x < 0) {
        vel.x = -vel.x;
        stats.edgehits += 1;
    }
    if (pos.x > 100) {
        vel.x = -vel.x;
        stats.edgehits += 1;
    }
    if (pos.y < 0) {
        vel.y = -vel.y;
        stats.edgehits += 1;
    }
    if (pos.y > 100) {
        vel.y = -vel.y;
        stats.edgehits += 1;
    }
    if ((pos.x <= 0) && (pos.y <= 0)) {
        stats.cornerhits += 1;
    }
    if ((pos.x >= 100) && (pos.y <= 0)) {
        stats.cornerhits += 1;
    }
    if ((pos.x >= 100) && (pos.y >= 100)) {
        stats.cornerhits += 1;
    }
    if ((pos.x <= 0) && (pos.y >= 100)) {
        stats.cornerhits += 1;
    }
    pos.x += vel.x;
    pos.y += vel.y;
    let data = JSON.stringify(stats);
    fs.writeFileSync('stats.json', data);
}, 25);

var cursorupdate = setInterval(function() {
    if (toggle == true) {
        client.sendArray([{m:'m', x: pos.x, y: pos.y}]);
    }
}, 25);