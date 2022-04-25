const mongoose = require('mongoose');


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
        minlength: 6,
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