const express = require('express');
const config = require('../../config/config');
const request = require('request');
const ipapi = require('ipapi.co');
const requestIp = require('request-ip');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('current', { weather: null, error: null });
    } catch (error) {
        // Print the error in console and send generic error to view
        console.error(error);
        res.render('current', { weather: null, error: 'Error, please try again' });
    }
});

router.get('/current', async (req, res) => {
    try {
        // Get client ip
        // const clientIp = requestIp.getClientIp(req);
        const clientIp = '190.105.217.131';
        if (!clientIp) {
            throw new Error('Error getting client ip');
        }

        const url = `http://ip-api.com/json/${clientIp}`;

        // Request ip-api
        request(url, (err, response, body) => {
            if (err) {
                throw new Error('Error connection with ip-api');
            } else {
                const location = JSON.parse(body);
                if (location.status === 'success') {
                    const { city } = location;
                    if (!city) {
                        throw new Error('City does not exist in the request');
                    }

                    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${config.apiKey}`;

                    // Request openweatherapi
                    request(url, (err, response, body) => {
                        if (err) {
                            throw new Error('Error connection with openweatherapi');
                        } else {
                            const weather = JSON.parse(body);

                            if (weather.main == undefined) {
                                res.render('current', { weather: null, error: 'City not found, please try again' });
                            } else {
                                const date = new Date();
                                const day = date.toLocaleString("en-US", {day: "numeric"});
                                const month = date.toLocaleString("en-US", {month: "short"});
                                const hours = String(date.getHours()).padStart(2, '0');
                                const minutes = String(date.getMinutes()).padStart(2, '0');
                                // Format: MM/DD HH:MM
                                const weatherTimezone = `${month} ${day}, ${hours}:${minutes}`;

                                const place = `${weather.name}, ${weather.sys.country}`;
                                const weatherTemp = parseInt(weather.main.temp);
                                const weatherPressure = weather.main.pressure;
                                const humidity = weather.main.humidity;
                                const wind = weather.wind.speed;
                                /* you will fetch the weather icon and its size using the icon data*/
                                const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
                                const weatherDescription = weather.weather[0].description;
                                const clouds = weather.clouds.all;
                                // Convert meters to kilometers
                                const visibility = parseInt(weather.visibility) * 0.001;
                                const main = weather.weather[0].main;

                                // you shall now render the data to your page (index.ejs) before displaying it out
                                res.render("current", {
                                    weather: weather,
                                    place: place,
                                    temp: weatherTemp,
                                    pressure: weatherPressure,
                                    icon: weatherIcon,
                                    description: weatherDescription,
                                    timezone: weatherTimezone,
                                    humidity: humidity,
                                    wind: wind,
                                    clouds: clouds,
                                    visibility: visibility,
                                    main: main,
                                    error: null,
                                });
                            }
                        }
                    });
                } else {
                    throw new Error('Error, please try again');
                }
            }
        });
    } catch (error) {
        // Print the error in console and send generic error to view
        console.error(error);
        res.render('current', { weather: null, error: 'Error, please try again' });
    }
});

router.get('/current/:city', async (req, res) => {
    try {
        const { city } = req.params;

        // Validations
        if (!city || isFinite(city)) {
            res.render('current', { weather: null, error: 'Please, enter a city' });
            return;
        }
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${config.apiKey}`;

        // Request openweatherapi
        request(url, (err, response, body) => {
            // On return, check the json data fetched
            if (err) {
                throw new Error('Error connection with openweatherapi');
            } else {
                const weather = JSON.parse(body);

                // console.log(weather);

                if (weather.main == undefined) {
                    res.render('current', { weather: null, error: 'City not found, please try again' });
                } else {
                    const date = new Date();
                    const day = date.toLocaleString("en-US", {day: "numeric"});
                    const month = date.toLocaleString("en-US", {month: "short"});
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    // Format: MM/DD HH:MM
                    const weatherTimezone = `${month} ${day}, ${hours}:${minutes}`;

                    const place = `${weather.name}, ${weather.sys.country}`;
                    const weatherTemp = parseInt(weather.main.temp);
                    const weatherPressure = weather.main.pressure;
                    const humidity = weather.main.humidity;
                    const wind = weather.wind.speed;
                    /* you will fetch the weather icon and its size using the icon data*/
                    const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
                    const weatherDescription = weather.weather[0].description;
                    const clouds = weather.clouds.all;
                    // Convert meters to kilometers
                    const visibility = parseInt(weather.visibility) * 0.001;
                    const main = weather.weather[0].main;

                    // you shall now render the data to your page (index.ejs) before displaying it out
                    res.render("current", {
                        weather: weather,
                        place: place,
                        temp: weatherTemp,
                        pressure: weatherPressure,
                        icon: weatherIcon,
                        description: weatherDescription,
                        timezone: weatherTimezone,
                        humidity: humidity,
                        wind: wind,
                        clouds: clouds,
                        visibility: visibility,
                        main: main,
                        error: null,
                    });
                }
            }
        });
    } catch (error) {
        // Print the error in console and send generic error to view
        console.error(error);
        res.render('current', { weather: null, error: 'Error, please try again' });
    }
});

router.get('/location', async (req, res) => {
    try {
        // const clientIp = requestIp.getClientIp(req);
        const clientIp = '190.105.217.131';
        if (!clientIp) {
            res.render('location', { location: null, error: 'Error, please try again' });
        }

        const url = `http://ip-api.com/json/${clientIp}`;
        // Request ip-api
        request(url, (err, response, body) => {
            if (err) {
                res.render('location', { location: null, error: 'Error, please try again' });
            } else {
                const location = JSON.parse(body);
                if (location.status === 'success') {
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
                } else {
                    throw new Error('Error, please try again');
                }
            }
        });
    } catch (error) {
        // Print the error in console and send generic error to view
        console.error(error);
        res.render('location', { location: null, error: 'Error, please try again' });
    }
});

router.get('/forecast', async (req, res) => {
    try {
        // Get client ip
        // const clientIp = requestIp.getClientIp(req);
        const clientIp = '190.105.217.131';
        if (!clientIp) {
            throw new Error('Error getting client ip');
        }

        const url = `http://ip-api.com/json/${clientIp}`;

        // Request ip-api
        request(url, (err, response, body) => {
            if (err) {
                throw new Error('Error connection with ip-api');
            } else {
                const location = JSON.parse(body);
                if (location.status === 'success') {
                    const { city } = location;
                    if (!city) {
                        throw new Error('City does not exist in the request');
                    }

                    const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=15&units=metric&appid=${config.apiKey}`;
                    console.log(weatherUrl);
                    // Request openweatherapi
                    request(weatherUrl, (err, response, body) => {
                        if (err) {
                            console.log('first if');
                            throw new Error('Error connection with openweatherapi');
                        } else {
                            console.log(body);
                            const forecast = JSON.parse(body);

                            if (forecast.cod !== '200') {
                                res.render('forecast', { forecast: null, error: 'City not found, please try again' });
                            } else {
                                if (forecast.list.length === 0) {
                                    throw new Error('Error, please try again');
                                }
                                const list = forecast.list;
                                console.log(list);
                                let listWeather = [];
                                forecast.list.forEach(weather => {
                                    const { temp_min, temp_max } = weather.main;
                                    const { description, icon } = weather.weather[0];

                                    const date = new Date(weather.dt_txt);
                                    const day = date.toLocaleString("en-US", {day: "numeric"});
                                    const month = date.toLocaleString("en-US", {month: "short"});
                                    const weekday = date.toLocaleString("en-US", {weekday: "short"});
                                    const weatherTime = `${weekday}, ${month} ${day}`;

                                    const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                                    const weatherTemps = `${parseInt(temp_max)} / ${parseInt(temp_min)}°C`;

                                    const newWeather = {
                                        time: weatherTime,
                                        icon: weatherIcon,
                                        temps: weatherTemps,
                                        description
                                    };
                                    listWeather.push(newWeather);
                                });
                                console.log(listWeather);
                                res.render('forecast', { forecast: true, listWeather: listWeather, error: null });
                            }
                        }
                    });
                } else {
                    console.log('secoud else');
                    throw new Error('Error, please try again');
                }
            }
        });
    } catch (error) {
        // Print the error in console and send generic error to view
        console.log('catch');
        console.error(error);
        res.render('forecast', { forecast: true, listWeather: [], error: 'Error, please try again' });
    }
});

module.exports = router;
