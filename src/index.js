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

// not found
app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(config.port);

app.use(logErrors);
app.use(errorHandler);

