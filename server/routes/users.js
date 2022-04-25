const express = require('express');
const app = express();
const flash= require('express-flash');
const methodOverride = require('method-override');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

app.use(express.json())
app.use(flash());

const {
    checkAuthenticated,
    checkNotAuthenticated
} = require('../config/auth');

app.use(bodyParser.urlencoded({ extended: false }));

const User = require('../models/User');


// Login Page
router.get('/login', checkNotAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', checkNotAuthenticated, (req, res) => res.render('register'));

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureflash: true
}))
router.post('/register', checkNotAuthenticated, async (req,res) => {
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
// // Register Handle
// router.post('/register', (req, res) => {
//     var userDetails = new User ({
//         name: req.body.name,
//         email: req.body.email
//     })
// //   var { name, email, password, password2 } = req.body;
//   console.log(userDetails);
// //   let errors = [];

// //   if (!name || !email || !password || !password2) {
// //     errors.push({ msg: 'Please enter all fields' });
// //   }

// //   if (password != password2) {
// //     errors.push({ msg: 'Passwords do not match' });
// //   }

// //   if (password.length < 6) {
// //     errors.push({ msg: 'Password must be at least 6 characters' });
// //   }

// //   if (errors.length > 0) {
// //     res.render('register', {
// //        errors,
// //        name,
// //        email,
// //        password,
// //        password2 
// //     })
// //     console.log(errors);
// //       } else {
// //         res.send('pass');
// //       }
//     });

module.exports = router;