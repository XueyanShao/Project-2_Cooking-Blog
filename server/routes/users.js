const express = require('express');
const app = express();

const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

const User = require('../models/User');

app.use(bodyParser.json())

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));


// Register Handle
router.post('/register', (req, res) => {
    var userDetails = new User ({
        name: req.body.name,
        email: req.body.email
    })
//   var { name, email, password, password2 } = req.body;
  console.log(userDetails);
//   let errors = [];

//   if (!name || !email || !password || !password2) {
//     errors.push({ msg: 'Please enter all fields' });
//   }

//   if (password != password2) {
//     errors.push({ msg: 'Passwords do not match' });
//   }

//   if (password.length < 6) {
//     errors.push({ msg: 'Password must be at least 6 characters' });
//   }

//   if (errors.length > 0) {
//     res.render('register', {
//        errors,
//        name,
//        email,
//        password,
//        password2 
//     })
//     console.log(errors);
//       } else {
//         res.send('pass');
//       }
    });

module.exports = router;