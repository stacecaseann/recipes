var menuModel = require('../database/menuModel');

const getAllMenus = async (req, res) => {
  //#swagger.tags = ['Menus']
  //#swagger.summary = 'Gets all menus.'
  try {
    const result = await menuModel.getAllMenus();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMenuById = async (req, res) => {
  //#swagger.tags = ['Menus']
  //#swagger.summary = 'Gets menu by id.'
  //#swagger.parameters['menuId'] = { description: 'The ID of the menu to retrieve.' }
  try {
    const result = await menuModel.getMenuById(req.params.menuId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {}
  res.status(500).json({ message: err.message });
};

const getMenuByName = async (req, res) => {
  //#swagger.tags = ['Menus']
  //#swagger.summary = 'Gets menu by name.'
  //#swagger.parameters['menuName'] = { description: 'The name of the menu to retrieve.' }
  try {
    const result = await menuModel.getMenuByName(req.params.menuName);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMenuTemplate = async (req, res) => {
  //#swagger.tags = ['Menus']
  //#swagger.summary = 'Creates an empty menu template.'
  //#swagger.parameters['menuName'] = { description: 'The name of the menu to create.' }
  try {
    const result = await menuModel.createMenuTemplate(req.params.menuName);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addRecipeToMenuByName = async (req, res) => {
  //#swagger.tags = ['Menus']
  //#swagger.summary = 'Adds a recipe to a menu.'
  //#swagger.parameters['menuName'] = { description: 'Then menu to add the recipe to.' }
  //#swagger.parameters['dayOfWeek'] = { description: 'Then day of week to add the recipe to.' }
  //#swagger.parameters['mealType'] = { description: 'Then meal type to add the recipe to.' }
  //#swagger.parameters['recipeName'] = { description: 'Then recipe name to add' }
  try {
    const menuName = req.params.menuName;
    const dayOfWeek = req.params.dayOfWeek;
    const mealType = req.params.mealType;
    const recipeName = req.params.recipeName;
    const result = await menuModel.addRecipeToMenuByName(
      menuName,
      dayOfWeek,
      mealType,
      recipeName,
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addRecipeToMenuById = async (req, res) => {
  //#swagger.tags = ['Menus']
  //#swagger.summary = 'Adds a recipe to a menu.'
  //#swagger.parameters['menuName'] = { description: 'Then menu to add the recipe to.' }
  //#swagger.parameters['dayOfWeek'] = { description: 'Then day of week to add the recipe to.' }
  //#swagger.parameters['mealType'] = { description: 'Then meal type to add the recipe to.' }
  //#swagger.parameters['recipeId'] = { description: 'Then recipe id to add' }
  try {
    const menuName = req.params.menuName;
    const dayOfWeek = req.params.dayOfWeek;
    const mealType = req.params.mealType;
    const recipeId = req.params.recipeId;
    const result = await menuModel.addRecipeToMenuById(
      menuName,
      dayOfWeek,
      mealType,
      recipeId,
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMenu = async (req, res) => {
  //#swagger.tags = ['Menus']
  //#swagger.summary = 'Deletes a menu by ID.'
  //#swagger.parameters['menuId'] = { description: 'The ID of the menu to delete.' }
  try {
    const result = await menuModel.deleteMenu(req.params.menuId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while deleting menu.',
    });
  }
};
module.exports = {
  getAllMenus,
  getMenuById,
  getMenuByName,
  createMenuTemplate,
  addRecipeToMenuById,
  addRecipeToMenuByName,
  deleteMenu,
};
