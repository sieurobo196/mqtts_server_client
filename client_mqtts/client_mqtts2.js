var mqtt = require('mqtt');
var fs = require('fs');

var TRUSTED_CA_FILE = __dirname + '/cv_mqtts_certificate.crt';
var MQTTS_URL ='mqtts://localhost:8883';
var mqtt_options = {
  clientId: 'client2',
  username: 'test',
  password: 'test',
  ca: [ fs.readFileSync(TRUSTED_CA_FILE) ]
};

var client = mqtt.connect(MQTTS_URL,mqtt_options); 

// SSL not yet work, use normal MQTT
client.on('connect', function(){
	client.subscribe('topic_user1');
	console.log("user2 ready recieve message");
    var count=0;
    setInterval(function(){
	   count++;
	   client.publish('topic_user2', 'user2 : message '+count);
    },20000);
});
client.on('message', function (topic, message){
    console.log('Message:'+message.toString());
    console.log('Topic:'+topic.toString()+'\n');
});
client.on('error', function(err, granted){
	console.log(err);
});

client.on('reconnect', function(){
	console.log('reconnect');
});