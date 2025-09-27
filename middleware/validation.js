const { body, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const Menu = require('../schemas/Menu');
const Recipe = require('../schemas/Recipe');

const validateMongoRecipeId = (req, res, next) => {
  const id = req.params.recipeId;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
};

const validateMongoMenuId = (req, res, next) => {
  const id = req.params.menuId;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
};

const validateRecipeRules = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('serves')
    .isInt({ min: 1 })
    .withMessage('Serves must be an integer greater than 0')
    .notEmpty()
    .withMessage('Serves is required'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('Ingredients must be a non-empty array'),
  body('ingredients.*.amount')
    .isFloat({ gt: 0 })
    .withMessage('Ingredient amount must be a number greater than 0')
    .notEmpty()
    .withMessage('Ingredient amount is required'),
  body('ingredients.*.amountString')
    .isString()
    .withMessage('Ingredient amountString must be a string')
    .notEmpty()
    .withMessage('Ingredient amountString is required'),
  body('ingredients.*.measurement')
    .isString()
    .withMessage('Ingredient measurement must be a string')
    .notEmpty()
    .withMessage('Ingredient measurement is required'),
  body('ingredients.*.measurementDescription')
    .optional()
    .isString()
    .withMessage('Ingredient measurementDescription must be a string'),
  body('ingredients.*.ingredient')
    .isString()
    .withMessage('Ingredient name must be a string')
    .notEmpty()
    .withMessage('Ingredient name is required'),
  body('ingredients.*.ingredientDescription')
    .optional()
    .isString()
    .withMessage('Ingredient description must be a string'),
  body('instructions')
    .isArray({ min: 1 })
    .withMessage('Instructions must be a non-empty array'),
  body('instructions.*.stepNumber')
    .isInt({ min: 1 })
    .withMessage('Instruction stepNumber must be an integer greater than 0')
    .notEmpty()
    .withMessage('Step Number is required'),
  body('instructions.*.instruction')
    .isString()
    .withMessage('Instruction must be a string')
    .notEmpty()
    .withMessage('Instruction is required'),
];

const validateRecipeUpdateRules = [
  body('name').isString().withMessage('Name must be a string'),
  body('serves')
    .isInt({ min: 1 })
    .withMessage('Serves must be an integer greater than 0'),
  body('description').isString().withMessage('Description must be a string'),
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('Ingredients must be a non-empty array'),
  body('ingredients.*.amount')
    .isFloat({ gt: 0 })
    .withMessage('Ingredient amount must be a number greater than 0'),
  body('ingredients.*.amountString')
    .isString()
    .withMessage('Ingredient amountString must be a string')
    .notEmpty()
    .withMessage('Ingredient amountString is required'),
  body('ingredients.*.measurement')
    .isString()
    .withMessage('Ingredient measurement must be a string')
    .notEmpty()
    .withMessage('Ingredient measurement is required'),
  body('ingredients.*.measurementDescription')
    .optional()
    .isString()
    .withMessage('Ingredient measurementDescription must be a string'),
  body('ingredients.*.ingredient')
    .isString()
    .withMessage('Ingredient name must be a string')
    .notEmpty()
    .withMessage('Ingredient name is required'),
  body('ingredients.*.ingredientDescription')
    .optional()
    .isString()
    .withMessage('Ingredient description must be a string'),
  body('instructions')
    .isArray({ min: 1 })
    .withMessage('Instructions must be a non-empty array'),
  body('instructions.*.stepNumber')
    .isInt({ min: 1 })
    .withMessage('Instruction stepNumber must be an integer greater than 0'),
  body('instructions.*.instruction')
    .isString()
    .withMessage('Instruction must be a string'),
];

const validateRecipeNameRules = [
  body('name')
    .isString()
    .withMessage('Recipe name must be a string')
    .notEmpty()
    .withMessage('Recipe name is required')
    .custom(async (value) => {
      const existing = await Recipe.findOne({ name: value });
      if (existing) {
        throw new Error('Recipe name already in use');
      }
    }),
];

const validateMenuRules = [
  body('menuName')
    .isString()
    .withMessage('Menu name must be a string')
    .notEmpty()
    .withMessage('Menu name is required')
    .custom(async (value) => {
      const existing = await Menu.findOne({ menuName: value });
      if (existing) {
        throw new Error('Menu name already in use');
      }
    }),
];

const validateMenuNameRules = [
  body('menuName')
    .isString()
    .withMessage('Menu name must be a string')
    .notEmpty()
    .withMessage('Menu name is required')
    .custom(async (value) => {
      const existing = await Menu.findOne({ menuName: value });
      if (existing) {
        throw new Error('Menu name already in use');
      }
    }),
];

const validateAddRecipeToMenuRules = [
  body('menuName')
    .isString()
    .withMessage('Menu name must be a string')
    .notEmpty()
    .withMessage('Menu name is required')
    .custom(async (value) => {
      const existing = await Menu.findOne({ menuName: value });
      if (!existing) {
        throw new Error('Menu does not exist');
      }
    }),
  body('dayOfWeek')
    .isString()
    .withMessage('Day of week must be a string')
    .notEmpty()
    .withMessage('Day of week is required')
    .isIn([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ])
    .withMessage('Day of week must be a valid day'),
  body('mealType')
    .isString()
    .withMessage('Meal type must be a string')
    .notEmpty()
    .withMessage('Meal type is required')
    .isIn(['Breakfast', 'Lunch', 'Dinner', 'Snacks'])
    .withMessage('Meal type must be a valid meal type'),
  body('recipeId')
    .isString()
    .withMessage('Recipe ID must be a string')
    .notEmpty()
    .withMessage('Recipe ID is required')
    .custom(async (value) => {
      const existing = await Recipe.findById(value);
      if (!existing) {
        throw new Error('Recipe does not exist');
      }
    }),
];

function validateValues(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  validateMongoRecipeId,
  validateMongoMenuId,
  validateRecipeRules,
  validateMenuRules,
  validateRecipeUpdateRules,
  validateRecipeNameRules,
  validateMenuNameRules,
  validateAddRecipeToMenuRules,
  validateValues,
};
