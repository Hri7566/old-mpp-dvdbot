var MPPClient = require('mpp-client-xt');
var client = MPPClient("http://www.multiplayerpiano.com", undefined);

client.start();
client.on("hi", () => {
    setTimeout(function() {
        client.sendArray([{m:'a', message:'test'}]);
    });
});
client.stop();