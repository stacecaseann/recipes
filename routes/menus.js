const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const validation = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', menuController.getAllMenus);
router.get(
  '/:menuId',
  validation.validateMongoMenuId,
  validation.validateValues,
  menuController.getMenuById,
);

router.get('/name/:menuName', menuController.getMenuByName);

router.post(
  '/template',
  validation.validateMenuNameRules,
  validation.validateValues,
  isAuthenticated,
  menuController.createMenuTemplate,
);
// router.put(
//   '/:menuName/:dayOfWeek/:mealType/name/:recipeName',
//   menuController.addRecipeToMenuByName,
// );
router.put(
  '/add-recipe/:menuName/:dayOfWeek/:mealType/id/:recipeId',
  validation.validateAddRecipeToMenuRules,
  // validation.validateMenuNameRules,
  validation.validateValues,
  isAuthenticated,
  menuController.addRecipeToMenuById,
);

router.delete(
  '/:menuId',
  validation.validateMongoMenuId,
  validation.validateValues,
  isAuthenticated,
  menuController.deleteMenu,
);

module.exports = router;
