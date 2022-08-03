# NodeWeatherApp

Check the current weather or forecast on any city on the planet.

This is a weather app made in NodeJS, with Express and OpenWeatherAPI.

The project with views was deployed in this heroku link: https://nodejs-weather-appv1.herokuapp.com/v1/

## Features

1. User's ability to search the weather or forecast of your current location.

2. User's ability to search the weather or forecast of any city.

3. User's location info.

4. Metric system.

5. Error handling.

6. Test with Jest and Supertest


## Installation

1. `git clone https://github.com/facubrusa/NodeWeatherApp.git`

2. `cd NodeWeatherApp`

3. `npm install`

4. Create an .env file in NodeWeatherApp/config/ like .example.env

4. Log-in to [Openweathermap.com](https://openweathermap.org/)

5. Create an API key

7. Paste API key for `API_KEY` in .env file created

8. `npm run dev`

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

