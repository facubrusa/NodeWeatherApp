const express = require('express');
const homeRouter = require('./home.router');
const currentRouter = require('./current.router');
const locationRouter = require('./location.router');
const forecastRouter = require('./forecast.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/v1', router);
    router.use('/', homeRouter);
    router.use('/current', currentRouter);
    router.use('/location', locationRouter);
    router.use('/forecast', forecastRouter);
}

module.exports = routerApi;
