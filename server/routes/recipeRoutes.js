const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// App Routes
router.get('/',recipeController.homepage);
router.get('/categories',recipeController.exploreCategories);
router.get('/recipe/:id',recipeController.exploreRecipe);
router.get('/submit-recipe',recipeController.submitRecipe);
module.exports = router;
