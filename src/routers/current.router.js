const express = require('express');

const LocationService = require('../services/location.service');
const CurrentService = require('../services/current.service');

const router = express.Router();

const locationService = new LocationService();
const currentService = new CurrentService();

router.get('/', async (req, res, next) => {
    try {
        // get client ip
        const clientIp = await locationService.getClientIp(req);

        // get client location
        const location = await locationService.getLocation(clientIp);
        const city = `${location.city}, ${location.countryCode}`

        // get current weather
        const weather = await currentService.getByCity(city);

        res.status(200).json(weather);
    } catch (error) {
        next(error);
    }
});

router.get('/:city', async (req, res, next) => {
    try {
        const { city } = req.params;
        const weather = await currentService.getByCity(city);

        res.status(200).json(weather);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
