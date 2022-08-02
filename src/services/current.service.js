const fetch = require('node-fetch');
const boom = require('@hapi/boom');
const config = require('../../config/config');

class CurrentService {

    constructor() {
        this.weatherApiUrl = 'http://api.openweathermap.org/data/2.5';
    }

    async getByCity(city) {
        const url = `${this.weatherApiUrl}/weather?q=${city}&units=metric&appid=${config.apiKey}`;
        const res = await fetch(url);
        const weather = await res.json();

        if (!weather) {
            throw boom.conflict('Error getting current weather, please try again');
        }
        if (weather.main == undefined) {
            throw boom.conflict('City not found, please try again');
        }
        return weather;
    }

}

module.exports = CurrentService;
