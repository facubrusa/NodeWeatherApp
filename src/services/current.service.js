const fetch = require('node-fetch');
const boom = require('@hapi/boom');
const config = require('../../config/config');

class CurrentService {

    constructor() {
        this.weatherApiUrl = 'http://api.openweathermap.org/data/2.5';
    }

    async getByCity(city) {
        if (!city || isFinite(city)) {
            throw boom.badRequest('Please, enter a city');
        }
        const url = `${this.weatherApiUrl}/weather?q=${city}&units=metric&appid=${config.apiKey}`;
        const res = await fetch(url);
        const weather = await res.json();

        if (!weather) {
            throw boom.conflict('Error getting current weather, please try again');
        }

        const responseCode = parseInt(weather.cod);
        if (responseCode !== 200) {
            this.handleErrorByCode(responseCode);
        }

        return weather;
    }

    handleErrorByCode(responseCode) {
        switch(responseCode) {
            case 400:
                throw boom.badRequest('Bad request to OpenWeatherMap');
            case 401:
                throw boom.unauthorized('Invalid API key');
            case 404:
                throw boom.notFound('City not found, please try again');
            default:
                throw boom.conflict('Error getting forecast, please try again');
        }
    }

}

module.exports = CurrentService;
