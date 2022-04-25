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