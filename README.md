# WeatherGIF
A simple node.js app that works with webtask.io (https://webtask.io/) to show the current weather using GIFs.

## Usage
- End users: Just visit this link in your browser: https://wt-2ae92d94dc01d22c4a4ef289252be7b2-0.run.webtask.io/app
- Developers:

    - Install WT-CLI: https://github.com/auth0/wt-cli
    - Get a Dark Sky account and API key: https://darksky.net/dev/account
    - Get a Cloudinary account and API key: http://cloudinary.com/
    - Change coordinates to the location you want.
    - Configure secrets in the app accordingly, and when ready, build the app like this:
        ```wt create app.js --secret darkSkyApiKey=<YOURDARKSKYAPIKEY> --secret cloudinarycloudName=<YOURCLOUDINARYCLOUDNAME> --secret cloudinaryAPIKey=<CLOUDINARYAPIKEY> --secret cloudinaryAPISecret=<CLOUDINARYAPISECRET>```
    - Boom, weather.

## Notes

- Dark Sky API in its free version allows 1,000	free calls.
- Not all weather cases or parameters have been predicted - fork the repo and make something awesome.

## Credit

- Forecast: https://www.npmjs.com/package/forecast
- Cloudinary: https://www.npmjs.com/package/cloudinary
- Powered by Dark Sky: https://darksky.net/poweredby/
