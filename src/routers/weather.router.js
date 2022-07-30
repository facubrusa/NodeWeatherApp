const express = require('express');
const config = require('../../config/config');
const request = require('request');
const ipapi = require('ipapi.co');
const requestIp = require('request-ip');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('current', { weather: null, error: null });
    } catch (error) {
        // Print the error in console and send generic error to view
        console.error(error);
        res.render('current', { weather: null, error: 'Error, please try again' });
    }
});

router.get('/current', async (req, res) => {
    try {
        res.render('current', { weather: null, error: null });
    } catch (error) {
        // Print the error in console and send generic error to view
        console.error(error);
        res.render('current', { weather: null, error: 'Error, please try again' });
    }
});

router.get('/current/:city', async (req, res) => {
    try {
        const { city } = req.params;

        // Validations
        if (!city || isFinite(city)) {
            res.render('current', { weather: null, error: 'Please, enter a city' });
            return;
        }
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${config.apiKey}`;

        // Request openweatherapi
        request(url, (err, response, body) => {
            // On return, check the json data fetched
            if (err) {
                res.render('current', { weather: null, error: 'Error, please try again' });
            } else {
                const weather = JSON.parse(body);

                // console.log(weather);

                if (weather.main == undefined) {
                    res.render('current', { weather: null, error: 'City not found, please try again' });
                } else {
                    const date = new Date();
                    const day = date.toLocaleString("en-US", {day: "numeric"});
                    const month = date.toLocaleString("en-US", {month: "short"});
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    // Format: MM/DD HH:MM
                    const weatherTimezone = `${month} ${day}, ${hours}:${minutes}`;

                    const place = `${weather.name}, ${weather.sys.country}`;
                    const weatherTemp = parseInt(weather.main.temp);
                    const weatherPressure = weather.main.pressure;
                    const humidity = weather.main.humidity;
                    const wind = weather.wind.speed;
                    /* you will fetch the weather icon and its size using the icon data*/
                    const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
                    const weatherDescription = weather.weather[0].description;
                    const clouds = weather.clouds.all;
                    // Convert meters to kilometers
                    const visibility = parseInt(weather.visibility) * 0.001;
                    const main = weather.weather[0].main;

                    // you shall now render the data to your page (index.ejs) before displaying it out
                    res.render("current", {
                        weather: weather,
                        place: place,
                        temp: weatherTemp,
                        pressure: weatherPressure,
                        icon: weatherIcon,
                        description: weatherDescription,
                        timezone: weatherTimezone,
                        humidity: humidity,
                        wind: wind,
                        clouds: clouds,
                        visibility: visibility,
                        main: main,
                        error: null,
                    });
                }
            }
        });
    } catch (error) {
        // Print the error in console and send generic error to view
        console.error(error);
        res.render('current', { weather: null, error: 'Error, please try again' });
    }
});

router.get('/location', async (req, res) => {
    try {
        await ipapi.location(location => {
            console.log(location);
            const {
                country_name: country,
                currency_name: currency,
                city,
                latitude,
                longitude,
            } = location;
            res.render('location', {
                location,
                country,
                city,
                currency,
                latitude,
                longitude,
                error: null,
            });
        });
    } catch (error) {
        // Print the error in console and send generic error to view
        console.log('enter into catch /location');
        console.error(error);
    }
});

router.get('/ip', async (req, res) => {
    try {
        const clientIp = requestIp.getClientIp(req);
        const response = `Your ip adress is ${clientIp}`;
        res.send(response);
    } catch (error) {
        // Print the error in console and send generic error to view
        console.error(error);
        res.render('location');
    }
});

router.get('/forecast', async (req, res) => {
    try {
        res.render('forecast');
    } catch (error) {
        // Print the error in console and send generic error to view
        console.error(error);
        res.render('forecast');
    }
});

module.exports = router;
