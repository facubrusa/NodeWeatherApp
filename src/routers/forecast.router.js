const express = require('express');

const LocationService = require('../services/location.service');
const ForecastService = require('../services/forecast.service');

const router = express.Router();

const locationService = new LocationService();
const forecastService = new ForecastService();

router.get('/', async (req, res) => {
    try {
        // get client ip
        const clientIp = await locationService.getClientIp(req);

        // get client location
        const location = await locationService.getLocation(clientIp);
        const city = `${location.city} (${location.regionName})`;

        // get forecast weather
        const forecast = await forecastService.getByCoordinates(location.lat, location.lon);

        let newForecast = [];
        forecast.forEach(weather => {
            const { date, max_temp, min_temp, icon, description } = weather;

            const weatherTemps = `${parseInt(max_temp)} / ${parseInt(min_temp)}°C`;
            const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            const newWeather = {
                date: date,
                icon: weatherIcon,
                temps: weatherTemps,
                description
            };
            newForecast.push(newWeather);
        });
        res.render('forecast', {
            forecast: newForecast.slice(0, 5),
            error: null,
            city: city
        });
    } catch (error) {
        res.render('forecast', {
            forecast: null,
            error: 'Error, please try again',
            city: null
        });
    }
});

router.get('/:city', async (req, res) => {
    try {
        const { city } = req.params;

        // Validations
        if (!city || isFinite(city)) {
            throw new Error('Please, enter a city');
        }

        // get forecast weather
        const forecast = await forecastService.getByCity(city);

        let newForecast = [];
        forecast.forEach(weather => {
            const { date, max_temp, min_temp, icon, description } = weather;

            const weatherTemps = `${parseInt(max_temp)} / ${parseInt(min_temp)}°C`;
            const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            const newWeather = {
                date: date,
                icon: weatherIcon,
                temps: weatherTemps,
                description
            };
            newForecast.push(newWeather);
        });
        res.render('forecast', {
            forecast: newForecast.slice(0, 5),
            error: null,
            city: city
        });
    } catch (error) {
        res.render('forecast', {
            forecast: null,
            error: 'Error, please try again',
            city: null
        });
    }
});

module.exports = router;
