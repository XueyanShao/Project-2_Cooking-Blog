// Express SETUP
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout','./layouts/main');
app.set('view engine','ejs')

const routes = require('./server/routes/recipeRoutes.js');
app.use('/',routes);

const bodyParser = require('body-parser');
const expressSession = require('express-session') ({
    secret:'secret',
    resave: false,
    saveUninitialized: false
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

app.listen(port, () => console.log(`Listening to port ${port}`));




