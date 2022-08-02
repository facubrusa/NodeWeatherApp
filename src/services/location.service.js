const fetch = require('node-fetch');
const requestIp = require('request-ip');
const boom = require('@hapi/boom');

class LocationService {

    constructor() {
        this.ipApiUrl = 'http://ip-api.com/json';
    }

    async getClientIp(req) {
        const clientIp = await requestIp.getClientIp(req);
        if (!clientIp) {
            throw boom.conflict('Error getting client ip, please try again');
        }
        return clientIp;
    }

    async getLocation(clientIp) {
        const url = `${this.ipApiUrl}/${clientIp}`;
        const res = await fetch(url);
        const location = await res.json();

        const { status, city, lat, lon  } = location;
        if (status !== 'success') {
            throw boom.notFound('Error getting client location, please try again');
        }
        if (!city || !lat || !lon) {
            throw boom.badRequest('Error getting client location info, please try again');
        }
        return location;
    }
}

module.exports = LocationService;
