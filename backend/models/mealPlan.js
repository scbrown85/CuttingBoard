// MealPlan Schema 
const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Reference to the user
  meals: [
    {
      name: String,
      ingredients: [String],
      macronutrients: {
        carbs: Number,
        protein: Number,
        fat: Number,
      },
    },
  ],
  // Additional fields as needed
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);
module.exports = MealPlan;
