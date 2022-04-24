// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

// //DB Config
// const db = require('../config/keys').MongoURI;

// //Connect to Mongo
// mongoose.connect(db,{ useNewUrlParser: true })
//     .then(() => console.log('Connected'))
//     .catch(err => console.log(err));

// // const db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'connection error:'));
// // db.once('open', function() {
// //     console.log('Connected')
// // });

// //Models
// require('./Category');
// require('./Recipe');
// require('./Login');
// require('./User');