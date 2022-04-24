// Express SETUP
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const expressSession = require('express-session') ({
    secret: 'secret',
    resave: false,
    saveUnitialized: false
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(expressSession);

const port = process.env.PORT || 3000;

//Passport
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

//Mongoose
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');



//DB Config
const db = require('./server/config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log('Connected'))
    .catch(err => console.log(err));

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

//EJS
app.set('layout','./layouts/main');
app.set('view engine','ejs')



//Routes
app.use('/',require('./server/routes/recipeRoutes.js'));
app.use('/users',require('./server/routes/users.js'));



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressSession);



app.listen(port, () => console.log(`Listening to port ${port}`));