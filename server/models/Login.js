const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const loginSchema = new mongoose.Schema({
    username: String,
    passport: String
});

loginSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('userInfo', loginSchema,'userInfo');

const UserDetails = mongoose.model('userInfo',loginSchema,'userInfo');

// Passport SETUP
const passport = require('passport');


// Passport Local Authentication
passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

// UserDetails.register({username: 'Xueyan', active: false},'123456');
// UserDetails.register({username: 'Fanglu', active: false},'123456');
// UserDetails.register({username: 'Sijia', active: false},'123456');