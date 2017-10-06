var mqtt = require('mqtt');
var tls = require('tls');

var host = 'mqtts://localhost:1883'; 


var SECURE_CERT = __dirname + '/../openssl/tls-cert.pem';

var options = {    
   clientId: "NodeClient"
   , clean: true   
   , certPath: SECURE_CERT    
}

var client = mqtt.connect(host, tls.connect(options)); 

client.on('connect', function () {
    console.log('client connected: n');
});
client.subscribe("Hello");
client.publish("Hello", "World!..");

client.on('message', function (topic, message, pakcet) {
    console.log("Recieved:= " + message.toString());
});