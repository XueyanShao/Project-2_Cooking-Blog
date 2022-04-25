// Express SETUP

const express = require('express');

const passport = require('passport');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash= require('express-flash');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
const User = require('./server/models/User');
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
const {
    checkAuthenticated,
    checkNotAuthenticated
} = require('./server/config/auth');

// app.use(bodyParser.json());

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
// app.use('/users',require('./server/routes/users.js'));
app.use(bodyParser.urlencoded({ extended: false }));




// Login Page
app.get('/login', checkNotAuthenticated, (req, res) => res.render('login'));

// Register Page
app.get('/register', checkNotAuthenticated, (req, res) => res.render('register'));

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
app.post('/register', checkNotAuthenticated, async (req,res) => {
    const userFound = await User.findOne({email: req.body.email})

    if(userFound) {
        req.flash('error','User with that email already exists');
        res.redirect('/register');
    } else {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password,10)
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            await user.save();
            res.redirect('/login');
        }catch(error) {
            console.log(error)
            res.redirect('/register');
        }
    }
}
)


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressSession);


app.listen(port, () => console.log(`Listening to port ${port}`));