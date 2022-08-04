# NodeWeatherApp

Check the current weather or forecast of any city on the planet.

This is a weather app made in NodeJS, with Express and OpenWeatherAPI.

The project with views was deployed in this heroku link: https://nodejs-weather-appv1.herokuapp.com/v1/

Routes documentation: https://drive.google.com/file/d/1hchQf36RKmjhekxhqZtoTDFj_srIWNfP/view

## Features

- User's ability to search the weather or forecast of your current location.

- User's ability to search the weather or forecast of any city.

- User's location info.

- Metric system.

- Error handling.

- Test with Jest and Supertest


## Installation

1. `git clone https://github.com/facubrusa/NodeWeatherApp.git`

2. `cd NodeWeatherApp`

3. `npm install`

4. Create an .env file in NodeWeatherApp/config/ like .example.env

4. Log-in to [Openweathermap.com](https://openweathermap.org/)

5. Create an API key

7. Paste API key for `API_KEY` in .env file created

8. `npm run dev`

## Notes (important)
If you are running the api in your localhost, the library request-ip will not get your ip address correctly.
Therefore, you should get your ip address from: https://whatismyipaddress.com/ and paste into the function getClientIp() located at NodeWeatherApp/src/services/location.service.js.

## Example of location.service.js
```

async getClientIp(req) {
        const clientIp = {YOUR_IP_ADRESS} // For example: '181.1.181.88'
        if (!clientIp) {
            throw boom.conflict('Error getting client ip, please try again');
        }
        return clientIp;
}

```

## Example of .env file

```

PORT=3000
NODE_ENV=development
API_KEY={YOUR_API_KEY}

```

## Running the Tests
The unit tests are based on jest, which may be installed via npm. To run the tests make sure that the npm dependencies are installed by running npm install from the project directory.

`npm run test`

Note that a connection to the internet is required to run the tests.

## Contributions

Any feature requests and pull requests are welcome!

## License

The project is under [ISC license](https://choosealicense.com/licenses/isc/).

