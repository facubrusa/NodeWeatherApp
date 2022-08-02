require('dotenv').config({ path: './config/.env' });

const config = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    apiKey: process.env.API_KEY,
};

module.exports = config;
