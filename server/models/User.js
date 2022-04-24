const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// const passportLocalMongoose = require('passport-local-mongoose');
// const passport = require('passport');
// app.use(passport.initialize());
// app.use(passport.session());

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
// userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

// passport.use(userSchema.createStrategy())
module.exports = User;