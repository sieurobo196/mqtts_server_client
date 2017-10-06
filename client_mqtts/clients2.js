
var mqtt = require('mqtt')
 
client = mqtt.connect('mqtt://user2:123456@localhost?clientId=user2');
 
client.subscribe('topic_user1');
client.on('connect', function () {
   console.log("user2 ready recieve message");
   //console.log(message);
   var count=0;
   setInterval(function(){
	   count++;
	   client.publish('topic_user2', 'user2 : message '+count);
   },10000);
  
});
client.on('message', function(topic, message) {
  console.log(message.toString());
  
});
 
console.log('Client started...');