const express = require('express');

const LocationService = require('../services/location.service');

const router = express.Router();
const locationService = new LocationService();

router.get('/', async (req, res) => {
    try {
        const clientIp = await locationService.getClientIp(req);
        const location = await locationService.getLocation(clientIp);
        const {
            country,
            countryCode,
            regionName,
            city,
            zip,
            lat: latitude,
            lon: longitude,
            query: ip,
            isp
        } = location;

        res.render('location', {
            error: null,
            location,
            country,
            countryCode,
            regionName,
            city,
            zip,
            latitude,
            longitude,
            ip,
            isp
        });

    } catch (error) {
        res.render('location', { location: null, error: 'Error, please try again' });
    }
});

module.exports = router;
