const express = require('express');

const LocationService = require('../services/location.service');

const router = express.Router();
const locationService = new LocationService();

router.get('/', async (req, res, next) => {
    try {
        const clientIp = await locationService.getClientIp(req);
        const location = await locationService.getLocation(clientIp);

        res.status(200).json(location);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
