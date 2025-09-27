const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const validation = require('../middleware/validation');

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
  menuController.createMenuTemplate,
);
// router.put(
//   '/:menuName/:dayOfWeek/:mealType/name/:recipeName',
//   menuController.addRecipeToMenuByName,
// );
router.put(
  '/:menuName/:dayOfWeek/:mealType/id/:recipeId',
  validation.validateAddRecipeToMenuRules,
  validation.validateMenuNameRules,
  validation.validateValues,
  menuController.addRecipeToMenuById,
);
router.delete(
  '/:menuId',
  validation.validateMongoMenuId,
  validation.validateValues,
  menuController.deleteMenu,
);

module.exports = router;
