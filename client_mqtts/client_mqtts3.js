var mqtt = require('mqtt');
var fs = require('fs');

var TRUSTED_CA_FILE = __dirname + '/cv_mqtts_certificate.crt';
//var MQTTS_URL ='mqtts://localhost:8883';
var MQTTS_URL ='mqtt.cn.l-kloud.com:8883';
var mqtt_options = {
  clientId: '011081VRWVJ8I8UUBTRAAAAA',
  username: 'VRWVJ8I8UUBT',
  password: '011081VRWVJ8I8UUBTRAAAAA',
  ca: [ fs.readFileSync(TRUSTED_CA_FILE) ]
};

var client = mqtt.connect(MQTTS_URL,mqtt_options); 

// SSL not yet work, use normal MQTT
client.on('connect', function(){
   console.log("user1 ready received message");
   client.subscribe('topic_user2');
   var count =0;
   setInterval(function(){
	   count++;
	   client.publish('topic_user1', 'user1: message '+count);
   },10000);
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