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
  var temperature = '';
  var looksLike = '';

  res.writeHead(200, { 'Content-Type': 'text/html '});

  // Retrieve weather information from coordinates (Belgrade, Serbia) and display gif depending on the forecast
  forecast.get([44.7866, 20.4489], (err, weather) => {
    if (err) cb(null, 'Error retrieving data.');

    // Get temperature
    var temperature = weather.currently.temperature;

    switch (weather.currently.summary) {
      case 'Sun':
        image = cloudinary.image('sunny_s8ivlz.gif');
        looksLike = 'Sunny and clear.';
        break;

      case 'Partly Cloudy':
        image = cloudinary.image("partly-sunny_t0xstu.gif");
        looksLike = 'Some clouds. Take an umbrella just in case.';
        break;

      case 'Rain':
        image = cloudinary.image("rain_wv83kb.gif");
        looksLike = 'Oh noes! It is raining :(';
        background = "#a186be";
        break;

      default:
        image = cloudinary.image("dress-accordingly_zydz74.gif");
        looksLike = 'Clear and dry, but dress accordingly.';
        background = "#69BDEE";
    }

    // Additional weather conditions
    if (weather.currently.icon === 'partly-cloudy-night') {
        image = cloudinary.image("partly-cloudy-night_pocr27.gif");
        looksLike = 'Some clouds.'
        background = "#030303";
    }

    // Render the template
    res.end(
      '<!DOCTYPE html>' +
      '<html>' +
        '<head>' +
          '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">' +
          '<style>' +
            'body {' +
              'font-family:' + 'Open Sans' + ', sans-serif;' +
              'background-color:' + background + ';' +
            '}' +
            'img, h2, p {' +
              'display: block;' +
              'margin: 0 auto;' +
              'text-align: center' +
            '}' +
            'h2 {' +
              'font-size: 30px;' +
              'font-weight: 700;' +
              'color: #fff;' +
            '}' +
            'p {' +
              'font-size: 16px;' +
              'margin-top: 5px;' +
              'color: #fff;' +
          '</style>' +
        '</head>' +
        '<body>' +
          '<div>' +
            image +
          '<h2>' +
            looksLike +
          '</h2>' +
          '<p>' +
            'Current temperature: ' +
            temperature +
            " &deg;C" +
          '</p>' +
        '</div>' +
        '</body>' +
      '</html>'
    );
  });
}
