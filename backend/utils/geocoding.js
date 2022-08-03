
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',

  // Optional depending on the providers
  apiKey: 'bOIWWnSYRhFLtHxK4bLUKwSyIUJJbRK3', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
