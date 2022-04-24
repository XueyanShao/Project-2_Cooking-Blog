require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');

// GET Homepage
exports.homepage = async(req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai'}).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American'}).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese'}).limit(limitNumber);
        const food = {latest, thai, american, chinese};

        res.render('index',{ title:'Cooking Blog - Home', categories, food, name:'Xueyan'});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}

//GET Categories
exports.exploreCategories = async(req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        
        res.render('categories',{ title: 'Cooking Blog - Categories', categories } );
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

//GET Recipe
exports.exploreRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);  
        res.render('recipe',{ title: 'Cooking Blog - Recipe', recipe } );
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


//Get Submit Recipe
exports.submitRecipe = async(req,res) => {
    res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe'})
}

//Get Login

// exports.loginPage = async(req,res) => {
//     res.render('login', { title: 'Cooking Blog - Log in'})
// }

// async function insertDummyCategoryData(){

//     try {
//         await Category.insertMany([
//             {
//                 "name": "Thai",
//                 "image": 'thai-food.jpg'
//             },
//             {
//                 "name": "American",
//                 "image": "american-food.jpg"
//             },
//             {
//                 "name": "Chinese",
//                 "image": "chinese-food.jpg"
//             },
//             {
//                 "name": "Mexican",
//                 "image": "mexican-food.jpg"
//             },
//             {
//                 "name": "Indian",
//                 "image": "indian-food.jpg"
//             },
//             {
//                 "name": "Spanish",
//                 "image": "spanish-food.jpg"
//             }
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDummyCategoryData();

// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       { 
//         "name": "Chinese Pork Dumplings",
//         "description": `In Seattle's International District, Liana Cafe House sells traditional Chinese pork dumplings from a tiny takeout shop. See how to make them at home.`,
//         "email": "recipeemail@gmail.com",
//         "ingredients": [
//           "½ cup soy sauce",
//           "1 tablespoon seasoned rice vinegar",
//           "1 tablespoon finely chopped Chinese chives",
//           "1 tablespoon sesame seeds",
//           "1 teaspoon chile-garlic sauce (such as Sriracha)",
//           "1 pound ground pork",
//           "3 cloves garlic, minced",
//           "1 large egg, beaten",
//           "2 tablespoons finely chopped Chinese chives",
//           "2 tablespoons soy sauce",
//           "1 tablespoon minced fresh ginger",
//           "50 dumpling wrappers"
//         ],
//         "category": "Chinese", 
//         "image": "dumpling-chinese.jpeg"
//       },
//       { 
//         "name": "Tailgate Tacos",
//         "description": `Mini taco cups are great for tailgating. Serve with your favorite taco toppings.`,
//         "email": "recipeemail@gmail.com",
//         "ingredients": [
//           "cooking spray",
//           "1 pound ground beef",
//           "½ cup salsa",
//           "2 tablespoons taco seasoning mix",
//           "2 cups shredded Mexican cheese blend",
//           "24 wonton wrappers"
//         ],
//         "category": "Mexican", 
//         "image": "taco-mexican.webp"
//       },
//       { 
//         "name": "Spicy Indian Dahl",
//         "description": `A spicy Indian lentil soup that can be enjoyed with rice or Naan, the Indian bread. A very healthy dish.`,
//         "email": "xueyan@westcliff.edu",
//         "ingredients": [
//           "1 cup red lentils",
//           "2 tablespoons ginger root, minced",
//           "1 teaspoon mustard seed",
//           "2 tablespoons chopped fresh cilantro",
//           "4 tomatoes, chopped",
//           "3 onions, chopped",
//           "3 jalapeno peppers, seeded and minced",
//           "1 tablespoon ground cumin",
//           "1 tablespoon ground coriander seed",
//           "6 cloves garlic, minced",
//           "2 tablespoons olive oil",
//           "1 cup water",
//           "salt to taste"
//         ],
//         "category": "Indian", 
//         "image": "dahl-indian.webp"
//       },

//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyRecipeData();

// async function insertDummyRecipeData(){

//     try {
//         await Recipe.insertMany([
//              { 
//         "name": "Shrimp Fried Noodles - Thai-Style",
//         "description": "Try this very popular Thai dish, good for lunch, supper, or anytime you crave something exotic with a little tang!",
//         "email": "xueyan@westcliff.edu",
//         "ingredients": [
//           "1 pound dried rice vermicelli",
//           "2 cups bean sprouts, divided",
//           "3 tablespoons vegetable oil",
//           "1 teaspoon minced garlic",
//           "10 unpeeled, large fresh shrimp",
//           "1 tablespoon white sugar",
//           "1 tablespoon Asian fish sauce (nuoc mam or nam pla)",
//           "2 eggs, beaten",
//           "1 tablespoon chopped dry roasted peanuts",
//           "1 tablespoon crushed dried shrimp",
//           "1 tablespoon chopped green onions",
//           "1 tablespoon chopped fresh cilantro",
//           "1 teaspoon chili powder"
//         ],
//         "category": "Thai", 
//         "image": "noodles-thai.webp"
//       },
//       { 
//         "name": "Good Old Fashioned Pancakes",
//         "description": "This is a great recipe that I found in my Grandma's recipe book. Judging from the weathered look of this recipe card, this was a family favorite.",
//         "email": "xueyan@westcliff.edu",
//         "ingredients": [
//           "1 1/2 cups all-purpose flour",
//           "3 1/2 teaspoons baking powder",
//           "1/4 teaspoon salt, or more to taste",
//           "1 tablespoon white sugar",
//           "1 1/4 cups milk",
//           "1 egg",
//           "3 tablespoons butter, melted"
//         ],
//         "category": "American", 
//         "image": "pancake-american.jpeg"
//       },
//       { 
//         "name": "Chinese Pork Dumplings",
//         "description": "In Seattle's International District, Liana Cafe House sells traditional Chinese pork dumplings from a tiny takeout shop. See how to make them at home.",
//         "email": "xueyan@westcliff.edu",
//         "ingredients": [
//           "½ cup soy sauce",
//           "1 tablespoon seasoned rice vinegar",
//           "1 tablespoon finely chopped Chinese chives",
//           "1 tablespoon sesame seeds",
//           "1 teaspoon chile-garlic sauce (such as Sriracha)",
//           "1 pound ground pork",
//           "3 cloves garlic, minced",
//           "1 large egg, beaten",
//           "2 tablespoons finely chopped Chinese chives",
//           "2 tablespoons soy sauce",
//           "1 tablespoon minced fresh ginger",
//           "50 dumpling wrappers"
//         ],
//         "category": "Chinese", 
//         "image": "dumpling-chinese.jpg"
//       },
//        { 
//         "name": "Tailgate Tacos",
//         "description": "Mini taco cups are great for tailgating. Serve with your favorite taco toppings.",
//         "email": "xueyan@westcliff.edu",
//         "ingredients": [
//           "cooking spray",
//           "1 pound ground beef",
//           "½ cup salsa",
//           "2 tablespoons taco seasoning mix",
//           "2 cups shredded Mexican cheese blend",
//           "24 wonton wrappers"
//         ],
//         "category": "Mexican", 
//         "image": "taco-mexican.webp"
//       },
//       { 
//         "name": "Spicy Indian Dahl",
//         "description": "A spicy Indian lentil soup that can be enjoyed with rice or Naan, the Indian bread. A very healthy dish.",
//         "email": "xueyan@westcliff.edu",
//         "ingredients": [
//           "1 cup red lentils",
//           "2 tablespoons ginger root, minced",
//           "1 teaspoon mustard seed",
//           "2 tablespoons chopped fresh cilantro",
//           "4 tomatoes, chopped",
//           "3 onions, chopped",
//           "3 jalapeno peppers, seeded and minced",
//           "1 tablespoon ground cumin",
//           "1 tablespoon ground coriander seed",
//           "6 cloves garlic, minced",
//           "2 tablespoons olive oil",
//           "1 cup water",
//           "salt to taste"
//         ],
//         "category": "Indian", 
//         "image": "dahl-indian.webp"
//       },
//       { 
//         "name": "Avocado and Tuna Tapas",
//         "description": "Living in Spain I have come across a literal plethora of tapas. This is a light, healthy tapa that goes best with crisp white wines and crunchy bread. This recipe is great for experimenting with a variety of different vegetables, spices, and vinegars.",
//         "email": "xueyan@westcliff.edu",
//         "ingredients": [
//           "1 (12 ounce) can solid white tuna packed in water, drained",
//           "1 tablespoon mayonnaise",
//           "3 green onions, thinly sliced, plus additional for garnish",
//           "½ red bell pepper, chopped",
//           "1 dash balsamic vinegar",
//           "black pepper to taste",
//           "1 pinch garlic salt, or to taste",
//           "2 ripe avocados, halved and pitted"
//         ],
//         "category": "Spanish", 
//         "image": "tapas-spanish.jpeg"
//       }
//     ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDummyRecipeData();