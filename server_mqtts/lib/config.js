
var SECURE_KEY = __dirname + '/../my-server.key.pem';
var SECURE_CERT = __dirname + '/../my-server.crt.pem';

var credentials = {
  keyPath: SECURE_KEY,
  certPath: SECURE_CERT,
  ca: [],
  requestCert: false,
  rejectUnauthorized: false
};

var settings = function(mosca) {
  return {
    interfaces: [
      //{type: 'mqtt', port: 1883},
      {type: 'mqtts', port: 8883, credentials: credentials}
    ]
  };
};

module.exports = settings;