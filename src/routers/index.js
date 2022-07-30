const express = require('express');
const weatherRouter = require('./weather.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/v1', router);
    router.use('/', weatherRouter);
}

module.exports = routerApi;
