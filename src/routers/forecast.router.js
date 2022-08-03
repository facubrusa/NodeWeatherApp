const express = require('express');

const LocationService = require('../services/location.service');
const ForecastService = require('../services/forecast.service');

const router = express.Router();

const locationService = new LocationService();
const forecastService = new ForecastService();

router.get('/', async (req, res, next) => {
    try {
        // get client ip
        const clientIp = await locationService.getClientIp(req);

        // get client location
        const location = await locationService.getLocation(clientIp);
        const city = `${location.city}, ${location.countryCode}`

        // get forecast weather
        const forecast = await forecastService.getByCity(city);

        res.status(200).json(forecast.slice(0, 5));
    } catch (error) {
        next(error);
    }
});

router.get('/:city', async (req, res, next) => {
    try {
        const { city } = req.params;

        // get forecast weather
        const forecast = await forecastService.getByCity(city);

        res.status(200).json(forecast.slice(0, 5));
    } catch (error) {
        next(error);
    }
});

module.exports = router;
