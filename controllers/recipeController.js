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
  //#swagger.parameters['recipe'] = { in: 'body', description: 'The recipe to create.', schema: { $ref: "#/definitions/Recipe" } }
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
