var recipeModel = require('../database/recipeModel');

const getAllRecipes = async (req, res) => {
  //#swagger.tags = ['Recipes']
  //#swagger.summary = 'Gets all recipes.'
  try {
    const result = await recipeModel.getAllRecipes();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
  //#swagger.tags = ['Recipes']
  //#swagger.summary = 'Gets a recipe by ID.'
  //#swagger.parameters['recipeId'] = { description: 'The ID of the recipe to retrieve.' }
  try {
    const result = await recipeModel.getRecipeById(req.params.recipeId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRecipesByName = async (req, res) => {
  //#swagger.tags = ['Recipes']
  //#swagger.summary = 'Gets all recipes to match Name.'
  //#swagger.parameters['recipeName'] = { description: 'The name of the recipes to retrieve.' }
  try {
    const result = await recipeModel.getRecipesByName(req.params.recipeName);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getRecipesByFilter = async (req, res) => {
//   //#swagger.tags = ['Recipes']
//   //#swagger.summary = 'Gets all recipes by json filter.'
//   //#swagger.parameters['filter'] = { description: 'Json structure filter to retrieve recipes.' }
//   try {
//     const result = await recipeModel.getRecipesByFilter(req.params.filter);
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const createRecipe = async (req, res) => {
  //#swagger.tags = ['Recipes']
  //#swagger.summary = 'Creates a new recipe.'
  /*#swagger.parameters['recipe'] = {
    in: 'body',
    description: 'The recipe to create.',
    schema: {
      example: {
        "name": "Chicken Parmesan",
        "serves": 4,
        "description": "Crispy breaded chicken breasts topped with marinara sauce and melted cheese.",
        "ingredients": [
          { "amount": 2, "amountString": "2", "measurementDescription": "unit", "measurement": "unit", "ingredient": "chicken breasts", "ingredientDescription": "boneless, skinless" },
          { "amount": 1, "amountString": "1", "measurementDescription": "cup", "measurement": "cup", "ingredient": "breadcrumbs", "ingredientDescription": "Italian seasoned" },
          { "amount": 0.5, "amountString": "1/2", "measurementDescription": "cup", "measurement": "cup", "ingredient": "Parmesan cheese", "ingredientDescription": "grated" },
          { "amount": 2, "amountString": "2", "measurementDescription": "unit", "measurement": "unit", "ingredient": "eggs", "ingredientDescription": "beaten" },
          { "amount": 1, "amountString": "1", "measurementDescription": "cup", "measurement": "cup", "ingredient": "marinara sauce" },
          { "amount": 1, "amountString": "1", "measurementDescription": "cup", "measurement": "cup", "ingredient": "mozzarella cheese", "ingredientDescription": "shredded" },
          { "amount": 2, "amountString": "2", "measurementDescription": "tablespoon", "measurement": "tbsp", "ingredient": "olive oil" },
          { "amount": 0.25, "amountString": "1/4", "measurementDescription": "teaspoon", "measurement": "tsp", "ingredient": "black pepper" },
          { "amount": 0.25, "amountString": "1/4", "measurementDescription": "teaspoon", "measurement": "tsp", "ingredient": "salt" }
        ],
        "instructions": [
          { "stepNumber": 1, "instruction": "Preheat oven to 375°F (190°C)." },
          { "stepNumber": 2, "instruction": "Mix breadcrumbs and Parmesan cheese in a shallow dish." },
          { "stepNumber": 3, "instruction": "Dip chicken breasts in beaten eggs, then coat with breadcrumb mixture." },
          { "stepNumber": 4, "instruction": "Heat olive oil in a skillet over medium heat. Cook chicken until golden brown on both sides." },
          { "stepNumber": 5, "instruction": "Place chicken in a baking dish. Top each breast with marinara sauce and mozzarella cheese." },
          { "stepNumber": 6, "instruction": "Bake for 20–25 minutes, until chicken is cooked through and cheese is bubbly." },
          { "stepNumber": 7, "instruction": "Serve hot with pasta or a side salad." }
        ]
      }
    }
  } */
  try {
    const result = await recipeModel.createRecipe(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while creating recipe.',
    });
  }
};

const updateRecipe = async (req, res) => {
  //#swagger.tags = ['Recipes']
  //#swagger.summary = 'Updates a recipe by ID.'
  //#swagger.description = 'Updates fields in the recipe. The ingredients and instructions will need the complete list in order to be updated correctly.'
  //#swagger.parameters['recipeId'] = { description: 'The ID of the recipe to update.' }
  //#swagger.parameters['recipe'] = { in: 'body', description: 'The recipe data to update.', schema: { $ref: "#/definitions/Recipe" } }
  try {
    const result = await recipeModel.updateRecipe(
      req.params.recipeId,
      req.body,
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while updating recipe.',
    });
  }
};

const deleteRecipe = async (req, res) => {
  //#swagger.tags = ['Recipes']
  //#swagger.summary = 'Deletes a recipe by ID.'
  //#swagger.parameters['recipeId'] = { description: 'The ID of the recipe to delete.' }
  try {
    const result = await recipeModel.deleteRecipe(req.params.recipeId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while deleting recipe.',
    });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipesByName,
  //   getRecipesByFilter,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
