const express = require('express');
const app = express();
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// App Routes
router.get('/',recipeController.homepage);
router.get('/categories',recipeController.exploreCategories);
router.get('/recipe/:id',recipeController.exploreRecipe);
router.get('/submit-recipe',recipeController.submitRecipe);
router.get('/login',recipeController.loginPage);

// Passport SETUP
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

// Login Routes
const connectEnsureLogin = require('connect-ensure-login');

router.get('/private',
    connectEnsureLogin.ensureLoggedIn(),
    (req,res) => res.sendFile('/private'));
router.get('/user',
    connectEnsureLogin.ensureLoggedIn(),
    (req,res) => res.send({ user: req.user }));
router.get('/logout',
    (req,res)=> {
        req.logout(),
        res.sendFile('/logout')
    });
module.exports = router;


app.post('/login', (req,res,next) => {
    passport.authenticate('local',
    (err,user,info) => {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.redirect('/login?info=' + info);
        }
        req.logIn(user, function(err) {
            if(err) {
                return next(err);
            }
            return res.redirect('/');
        });
    }) (req,res,next);
});
app.get('/private',
    connectEnsureLogin.ensureLoggedIn(),
    (req,res) => res.sendFile('/private'));
app.get('/user',
    connectEnsureLogin.ensureLoggedIn(),
    (req,res) => res.send({ user: req.user }));
app.get('/logout',
    (req,res)=> {
        req.logout(),
        res.sendFile('/logout')
    });

