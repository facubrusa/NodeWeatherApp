const express = require('express');

const LocationService = require('../services/location.service');
const CurrentService = require('../services/current.service');

const router = express.Router();

const locationService = new LocationService();
const currentService = new CurrentService();

router.get('/', async (req, res) => {
    try {
        // get client ip
        const clientIp = await locationService.getClientIp(req);

        // get client location
        const location = await locationService.getLocation(clientIp);

        // get current weather
        const weather = await currentService.getByCoordinates(location.lat, location.lon);

        // generate response with the data received
        const date = new Date();
        const day = date.toLocaleString("en-US", {day: "numeric"});
        const month = date.toLocaleString("en-US", {month: "short"});
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const weatherTimezone = `${month} ${day}, ${hours}:${minutes}`;

        const place = `${weather.name}, ${weather.sys.country}`;
        const weatherTemp = parseInt(weather.main.temp);
        const humidity = weather.main.humidity;
        const wind = weather.wind.speed;
        /* you will fetch the weather icon and its size using the icon data*/
        const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        const weatherDescription = weather.weather[0].description;
        // Convert meters to kilometers
        const visibility = parseInt(weather.visibility) * 0.001;

        // render data to page (current.ejs) before displaying it out
        res.render("current", {
            weather: weather,
            place: place,
            temp: weatherTemp,
            icon: weatherIcon,
            description: weatherDescription,
            timezone: weatherTimezone,
            humidity: humidity,
            wind: wind,
            visibility: visibility,
            error: null,
        });
    } catch (error) {
        res.render('current', { weather: null, error: 'Error, please try again' });
    }
});

router.get('/:city', async (req, res) => {
    try {
        const { city } = req.params;

        // Validations
        if (!city || isFinite(city)) {
            throw new Error('Please, enter a city');
        }

        const weather = await currentService.getByCity(city);

        // generate response with the data received
        const date = new Date();
        const day = date.toLocaleString("en-US", {day: "numeric"});
        const month = date.toLocaleString("en-US", {month: "short"});
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const weatherTimezone = `${month} ${day}, ${hours}:${minutes}`;

        const place = `${weather.name}, ${weather.sys.country}`;
        const weatherTemp = parseInt(weather.main.temp);
        const humidity = weather.main.humidity;
        const wind = weather.wind.speed;
        /* you will fetch the weather icon and its size using the icon data*/
        const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        const weatherDescription = weather.weather[0].description;
        // Convert meters to kilometers
        const visibility = parseInt(weather.visibility) * 0.001;

        // render data to page (current.ejs) before displaying it out
        res.render("current", {
            weather: weather,
            place: place,
            temp: weatherTemp,
            icon: weatherIcon,
            description: weatherDescription,
            timezone: weatherTimezone,
            humidity: humidity,
            wind: wind,
            visibility: visibility,
            error: null,
        });
    } catch (error) {
        res.render('current', { weather: null, error: 'Error, please try again' });
    }
});

module.exports = router;
