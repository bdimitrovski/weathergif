// Require forecast and cloudinary
var Forecast = require('forecast');
var cloudinary = require('cloudinary');

module.exports = (context, cb, res) => {

  // Configure secrets
  var darkSkyAPIKey = context.data.darkSkyApiKey;
  var cloudinaryCloudName = context.data.cloudinarycloudName;
  var cloudinaryAPIKey = context.data.cloudinaryAPIKey;
  var cloudinaryAPISecret = context.data.cloudinaryAPISecret;

  // Configure forecast
  var forecast = new Forecast({
    service: 'darksky',
    key: darkSkyAPIKey,
    units: 'celcius',
    cache: true,
    ttl: {
      minutes: 27,
      seconds: 45
    }
  });

  // Configure cloudinary
  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryAPIKey,
    api_secret: cloudinaryAPISecret
  });

  // Some general settings
  var image = '';
  var background = '#117A8E';

  res.writeHead(200, { 'Content-Type': 'text/html '});

  // Retrieve weather information from coordinates (Belgrade, Serbia) and display gif depending on the forecast
  forecast.get([44.7866, 20.4489], (err, weather) => {
    if (err) cb(null, 'Error retrieving data.');

    switch (weather.currently.summary) {
      case 'Sun':
        image = cloudinary.image('sunny_s8ivlz.gif');
        break;

      case 'Partly Cloudy':
        image = cloudinary.image("partly-sunny_t0xstu.gif");
        break;

      case 'Rain':
        image = cloudinary.image("rain_wv83kb.gif");
        background = "#a186be";
        break;

      default:
        image = cloudinary.image("dress-accordingly_zydz74.gif");
        background = "#69BDEE";
    }

    // Render the template
    res.end(
      '<!DOCTYPE html>' +
      '<html>' +
        '<head>' +
          '<style>' +
            'body {' +
              'background-color:' + background + ';' +
            '}' +
            'img {' +
              'display: block;' +
              'margin: 0 auto;' +
            '}' +
          '</style>' +
        '</head>' +
        '<body>' +
          '<div>' +
            image +
          '</div>' +
        '</body>' +
      '</html>'
    );
  });
}
