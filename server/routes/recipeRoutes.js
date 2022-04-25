const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const {
    checkAuthenticated,
    checkNotAuthenticated
} = require('../config/auth');

// App Routes
router.get('/',recipeController.homepage);
router.get('/categories',recipeController.exploreCategories);
router.get('/recipe/:id',recipeController.exploreRecipe);
router.get('/submit-recipe',recipeController.submitRecipe);


// // Passport SETUP
// const passport = require('passport');

// app.use(passport.initialize());
// app.use(passport.session());



module.exports = router;






