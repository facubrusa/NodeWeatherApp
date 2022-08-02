const fetch = require('node-fetch');
const boom = require('@hapi/boom');
const config = require('../../config/config');

class ForecastService {

    constructor() {
        this.weatherApiUrl = 'http://api.openweathermap.org/data/2.5';
    }

    async getByCity(city) {
        const url = `${this.weatherApiUrl}/forecast?q=${city}&units=metric&appid=${config.apiKey}`;
        const res = await fetch(url);
        const forecast = await res.json();

        return this.generateResponse(forecast);
    }

    async getByCoordinates(lat, lon) {
        const url = `${this.weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${config.apiKey}`;
        const res = await fetch(url);
        const forecast = await res.json();

        return this.generateResponse(forecast);
    }

    generateResponse(forecast) {
        if (forecast.cod !== '200') {
            throw boom.conflict('Error getting forecast, please try again');
        }

        const groupByDate = this.groupForecastByDate(forecast.list);
        const dates = Object.keys(groupByDate);

        // Generate one object for each day
        const newForecast = this.weatherByDate(dates, groupByDate);
        return newForecast;
    }

    groupForecastByDate(list) {
        return list.reduce((group, element) => {
          const date = new Date(element.dt_txt).toLocaleDateString("en-US");
          group[date] = group[date] || [];
          group[date].push(element);
          return group;
        }, {});
    }

    weatherByDate(dates, groupByDate) {
        const forecast = [];
        dates.forEach((date) => {
            let min_temp = 999;
            let max_temp = -999;
            // get min and max temp
            for (const property in groupByDate[date]) {
                const weather = groupByDate[date][property];
                const { temp_min, temp_max } = weather.main;
                if (temp_max > max_temp) max_temp = temp_max;
                if (temp_min < min_temp) min_temp = temp_min;
            }

            // get the other information from the middle of the day
            const dateLength = groupByDate[date].length;
            const index = (dateLength === 1) ? 0 : Math.ceil(dateLength / 2);
            const { temp, feels_like, pressure, humidity} = groupByDate[date][index].main;
            const { main, icon, description } = groupByDate[date][index].weather[0];
            const newDate = new Date(date);
            const day = newDate.toLocaleString("en-US", {day: "numeric"});
            const month = newDate.toLocaleString("en-US", {month: "short"});
            const weekday = newDate.toLocaleString("en-US", {weekday: "short"});
            const weatherTime = `${weekday}, ${month} ${day}`;
            const newWeather = {
                max_temp: max_temp,
                min_temp: min_temp,
                temp,
                feels_like,
                pressure,
                humidity,
                main,
                icon,
                description,
                date: weatherTime
            };
            forecast.push(newWeather);
        });
        return forecast;
    }
}

module.exports = ForecastService;
