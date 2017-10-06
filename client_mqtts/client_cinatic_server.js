var mqtt = require('mqtt');
var fs = require('fs');

var TRUSTED_CA_FILE = __dirname + '\\cert.pem';
//var MQTTS_URL ='mqtts://mqtt.cinatic.com:8883';
var MQTTS_URL ='mqtt://localhost:8883';
var mqtt_options = {
  username: '0800271C951F',
  password: '0000010800271C951FDNWNKT',
  ca: [ fs.readFileSync(TRUSTED_CA_FILE) ]
};

var client = mqtt.connect(MQTTS_URL,mqtt_options); 
var topic = 'app/00112233445500000002/sub';
var topicSend = 'app/00112233445500000001/sub';
//var topic = 'dev/000AE21F157DQdjvxkxs/sub'

client.on('connect', function ()
{
    client.subscribe(topic);

    client.publish(topicSend, "3id=app/00112233445500000002/sub&action=command&command=get_version", {retain: false, 'QoS': 1});

});

client.on('message', function (topic, message)
{
	//client.publish("/android-app/paho280201597909749/sub", "lam hoai ko xong", {retain: false, 'QoS': 1});
    console.log('Message:'+message.toString());
    console.log('Topic:'+topic.toString()+'\n');
    
});

