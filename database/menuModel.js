const Menu = require('../schemas/Menu');
const Recipe = require('../schemas/Recipe');

async function getAllMenus() {
  try {
    const menus = await Menu.find().populate('dailyRecipes.meals.recipes');
    console.log('Menus:', menus);
    return menus;
  } catch (err) {
    console.error('Menu could not be found:', err.message);
    throw err;
  }
}

async function getMenuById(menuId) {
  try {
    const menu = await Menu.findById(menuId).populate('recipes');
    console.log('Menu found:', menu);
    return menu;
  } catch (err) {
    console.error('Menu could not be found:', err.message);
    throw err;
  }
}

async function getMenuByName(menuName) {
  try {
    const menu = await Menu.findOne({ name: menuName }).populate('recipes');
    console.log('Menu found:', menu);
    return menu;
  } catch (err) {
    console.error('Menu could not be found:', err.message);
    throw err;
  }
}

async function createMenuTemplate(menuName) {
  try {
    const menu = await Menu.create({
      name: menuName,
      dailyRecipes: [
        {
          dayOfWeek: 'Monday',
          meals: [
            { mealType: 'Breakfast', mealTypeOrder: 1, recipes: [] },
            { mealType: 'Lunch', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Dinner', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Snacks', mealTypeOrder: 2, recipes: [] },
          ],
        },
        {
          dayOfWeek: 'Tuesday',
          meals: [
            { mealType: 'Breakfast', mealTypeOrder: 1, recipes: [] },
            { mealType: 'Lunch', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Dinner', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Snacks', mealTypeOrder: 2, recipes: [] },
          ],
        },
        {
          dayOfWeek: 'Wednesday',
          meals: [
            { mealType: 'Breakfast', mealTypeOrder: 1, recipes: [] },
            { mealType: 'Lunch', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Dinner', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Snacks', mealTypeOrder: 2, recipes: [] },
          ],
        },
        {
          dayOfWeek: 'Thursday',
          meals: [
            { mealType: 'Breakfast', mealTypeOrder: 1, recipes: [] },
            { mealType: 'Lunch', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Dinner', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Snacks', mealTypeOrder: 2, recipes: [] },
          ],
        },
        {
          dayOfWeek: 'Friday',
          meals: [
            { mealType: 'Breakfast', mealTypeOrder: 1, recipes: [] },
            { mealType: 'Lunch', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Dinner', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Snacks', mealTypeOrder: 2, recipes: [] },
          ],
        },
        {
          dayOfWeek: 'Saturday',
          meals: [
            { mealType: 'Breakfast', mealTypeOrder: 1, recipes: [] },
            { mealType: 'Lunch', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Dinner', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Snacks', mealTypeOrder: 2, recipes: [] },
          ],
        },
        {
          dayOfWeek: 'Sunday',
          meals: [
            { mealType: 'Breakfast', mealTypeOrder: 1, recipes: [] },
            { mealType: 'Lunch', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Dinner', mealTypeOrder: 2, recipes: [] },
            { mealType: 'Snacks', mealTypeOrder: 2, recipes: [] },
          ],
        },
      ],
    });
    console.log('Menu template created:', menu);
    return menu;
  } catch (err) {
    console.error('Error creating menu template:', err.message);
    throw err;
  }
}

async function addRecipeToMenuByName(
  menuName,
  dayOfWeek,
  mealType,
  recipeName,
) {
  try {
    const menu = await Menu.findOne({ name: menuName });
    if (!menu) {
      throw new Error('Menu not found');
    }
    const recipeId = await Recipe.findOne({ name: recipeName }).select('_id');
    if (!recipeId) {
      throw new Error('Recipe not found');
    }
    const dayEntry = menu.dailyRecipes.find(
      (entry) => entry.dayOfWeek === dayOfWeek && entry.mealType === mealType,
    );
    if (!dayEntry) {
      throw new Error('Day or meal type not found in menu');
    }
    //TODO validate that recipeId exists in Recipe collection
    dayEntry.recipes.push(recipeId);
    await menu.save();
    console.log('Recipe added to menu:', menu);
  } catch (err) {
    console.error('Error adding recipe to menu:', err.message);
    throw err;
  }
}

async function addRecipeToMenuById(menuName, dayOfWeek, mealType, recipeId) {
  try {
    const menu = await Menu.findOne({ name: menuName });
    if (!menu) {
      throw new Error('Menu not found');
    }
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    const dayEntry = menu.dailyRecipes
      .find((day) => day.dayOfWeek === dayOfWeek)
      ?.meals.find((meal) => meal.mealType === mealType);

    //todo start here, if day or mealtype not found, create them
    if (!dayEntry) {
      throw new Error('Day or meal type not found in menu');
    }
    //TODO validate that recipeId exists in Recipe collection
    dayEntry.recipes.push(recipeId);
    await menu.save();
    console.log('Recipe added to menu:', menu);
  } catch (err) {
    console.error('Error adding recipe to menu:', err.message);
    throw err;
  }
}

async function deleteMenu(menuId) {
  try {
    const menu = await Menu.deleteOne({ _id: menuId });
    console.log('Menu deleted:', menu);
    return menu;
  } catch (err) {
    console.error('Menu could not be deleted:', err.message);
    throw err;
  }
}

module.exports = {
  getAllMenus,
  getMenuById,
  getMenuByName,
  createMenuTemplate,
  addRecipeToMenuByName,
  addRecipeToMenuById,
  deleteMenu,
};
