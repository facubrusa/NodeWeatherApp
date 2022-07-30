const express = require('express');
const path = require('path');
const config = require('../config/config');
const routerApi = require('./routers/index');
const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();

// settings
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// router
routerApi(app);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

app.use(logErrors);
app.use(errorHandler);

