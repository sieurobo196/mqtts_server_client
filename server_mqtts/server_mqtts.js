var logger = require( 'winston' );
var mosca = require('mosca');
var authen = require('./lib/authen');
var settings = require('./lib/config');

var logger = new ( logger.Logger )( {
    transports: [
        new ( logger.transports.Console )( { 'timestamp': true } ),
        new logger.transports.File( { filename: __dirname + '/mqtts_log.log' } )
    ]
} );


var server = new mosca.Server(settings(mosca));
server.on('ready', setup);


// the mqtt server is ready
function setup() {
	server.authenticate = authen.authenticate;
	server.authorizePublish = authen.authorizePublish;
	server.authorizeSubscribe = authen.authorizeSubscribe;
	logger.info('Mosca server is up and running');
	//console.log('Mosca server is up and running');
}
 
//show log client is connected
server.on('clientConnected', function(client) {
  //console.log('client connected', client.id);
  logger.info('client connected: ' + client.id);
});
 
// when a message is received from client
server.on('published', function(packet, client) {
  //console.log('Published : ', packet.payload.toString());
  logger.info('Published: ' + packet.payload.toString());
});
 
// when a client subscribes to a topic 
server.on('subscribed', function(topic, client) {
  //console.log('subscribed : ', topic);
  logger.info('subscribed: ' + topic);
});
 
// when a client unsubscribes to a topic
server.on('unsubscribed', function(topic, client) {
  //console.log('unsubscribed : ', topic);
  logger.info('subscribed: ' + topic);
});
 
// when a client is disconnecting
server.on('clientDisconnecting', function(client) {
  //console.log('client Disconnecting : ', client.id);
  logger.info('client Disconnecting: ' + client.id);
});
 
// fwhen a client is disconnected
server.on('clientDisconnected', function(client) {
  //console.log('clientDisconnected : ', client.id);
  logger.info('client Disconnected: ' + client.id);
});
