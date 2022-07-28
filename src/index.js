const express = require('express');
const path = require('path');
const config = require('../config/config');

const app = express();

// settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
    res.send('Home');
});

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
