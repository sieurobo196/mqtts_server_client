var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://user1:123456@localhost?clientId=user1');
//var client  = mqtt.connect('mqtt://user1:123456@mqtt.staging.l-kloud.com:1883?clientId=user1');
client.subscribe('topic_user2');
client.on('connect', function () {
   console.log("user1 ready received message");
   //console.log(message);
   var count =0;
   setInterval(function(){
	   count++;
	   client.publish('topic_user1', 'user1: message '+count,{retain: false, 'QoS': 1});
   },10000);
  
});
 
client.on('message', function (topic, message) {
   //message is Buffer 
  console.log(message.toString());
}); 