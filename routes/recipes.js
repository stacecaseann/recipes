const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const validation = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', recipeController.getAllRecipes);
router.get(
  '/:recipeId',
  validation.validateMongoRecipeId,
  validation.validateValues,
  recipeController.getRecipeById,
);
router.get(
  '/name/:recipeName',
  validation.validateValues,
  recipeController.getRecipesByName,
);
// router.get('/filter/:filter', recipeController.getRecipesByFilter);
router.post(
  '/',
  validation.validateRecipeRules,
  validation.validateRecipeNameRules,
  validation.validateValues,
  isAuthenticated,
  recipeController.createRecipe,
);
router.put(
  '/:recipeId',
  validation.validateMongoRecipeId,
  validation.validateRecipeNameRules,
  validation.validateValues,
  isAuthenticated,
  recipeController.updateRecipe,
);
router.delete(
  '/:recipeId',
  validation.validateMongoRecipeId,
  validation.validateValues,
  isAuthenticated,
  recipeController.deleteRecipe,
);

module.exports = router;
