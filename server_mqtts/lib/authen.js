//var Redis_query = require( './checkuuid.js' ).Redis_query;
//var OnOff_query = require( './checkonoff.js' ).Mongo_query;
var logger = require( 'winston' );
var logger = new ( logger.Logger )( {
    transports: [
        new ( logger.transports.Console )( { 'timestamp': true } ),
        new logger.transports.File( { filename: __dirname + '/authen.log' } )
    ]
} );

var authenticate = function (client, username, password, callback) {
   /* OnOff_query.checkConnect(password, function(check){
        if(check.data & check.status == 200){
            client.pass = password;
            Redis_query.SearchCameraUDID(username, password, function(result){
                if(result){            
                    callback(null, true);
                } else {
                    callback(null, false);
                }      
            }); 
            
        } else if(!check.data & check.status == 200){
            callback(null, false);
        } else{
            callback(null, false);
        }
    });   */
	logger.info("username: "+username);
	logger.info("password: "+password);
    if(username == 'test' && password.toString() == 'test'){
        callback(null, true);
    } else {
        callback(null, false);
    }
};

var authorizePublish = function(client, topic, payload, callback) {
 callback(null, topic != '#'&& topic.split('/')[0]!='#' && topic.split('/')[1]!='#' && topic != '+'&& topic.split('/')[0]!='+' && topic.split('/')[1]!='+');
}

var authorizeSubscribe = function(client, topic, callback) {
 callback(null, topic != '#'&& topic.split('/')[0]!='#' && topic.split('/')[1]!='#' && topic != '+'&& topic.split('/')[0]!='+' && topic.split('/')[1]!='+');
}

module.exports.authenticate = authenticate;
module.exports.authorizePublish = authorizePublish;
module.exports.authorizeSubscribe = authorizeSubscribe;
