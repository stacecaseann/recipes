const mongoose = require('mongoose');

const mealTypeOrderMap = {
  Breakfast: 1,
  Lunch: 2,
  Dinner: 3,
  Snack: 4,
};
const menuSchema = new mongoose.Schema({
  menuName: { type: String, required: true, unique: true },
  dailyRecipes: [
    {
      dayOfWeek: {
        type: String,
        required: true,
        enum: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
      },
      meals: [
        {
          mealType: {
            type: String,
            required: false,
            enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
          },
          // mealTypeOrder: {
          //   type: Number,
          // },
          recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
        },
      ],
    },
  ],
});

// menuSchema.pre('save', function (next) {
//   if (this.mealType) {
//     this.mealTypeOrder = mealTypeOrderMap[this.mealType];
//   }
//   next();
// });

module.exports = mongoose.model('Menu', menuSchema);
