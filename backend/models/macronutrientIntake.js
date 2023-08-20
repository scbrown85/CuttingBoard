 
const mongoose = require('mongoose');

const macronutrientIntakeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  gender: String,
  age: Number,
  activityLevel: String,
  height: Number,
  waist: Number,
  hips: Number,
  neck: Number,
  startingWeight: Number,
  goalWeight: Number,
  startDate: Date,
  goalDate: Date,
  dailyTracking: [
    {
      date: Date,
      weight: Number,
      caloriesConsumed: Number,
    },
  ],
  weeklyTracking: [
    {
      date: Date,
      bodyMeasurements: {
        waist: Number,
        hips: Number,
        neck: Number,
      },
    },
  ],
  recommendations: {
    protein: Number,
    fats: Number,
    carbohydrates: Number,
    dailyCaloricIntake: Number,
    estimatedWeightChangePerWeek: Number,
  },
});

const MacronutrientIntake = mongoose.model('MacronutrientIntake', macronutrientIntakeSchema);

module.exports = MacronutrientIntake;
