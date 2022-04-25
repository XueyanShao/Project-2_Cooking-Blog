// Express SETUP

const express = require('express');

const passport = require('passport');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash= require('express-flash');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');

const {
    checkAuthenticated,
    checkNotAuthenticated
} = require('./server/config/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) 

app.use(express.json())
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

const port = process.env.PORT || 3000;

//Passport

const initializePassport = require('./passport-config')
initializePassport (
    passport,
    async(email) => {
        const userFound = await User.findOne({ email })
        return userFound
    },
    async (id) => {
        const userFound = await User.findOne({_id: id})
        return userFound
    }
);

//Mongoose
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');



//DB Config
const db = require('./server/config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
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