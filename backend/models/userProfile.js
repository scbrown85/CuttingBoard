const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  age: Number,
  weight: Number,
  height: Number,
  activityLevel: String,
  gender: String,
  waist: Number,
  hips: Number,
  neck: Number,
  goalWeight: Number,
  currentWeight: Number,
  goalDate: Date,
  startDate: Date,
  TDEE: Number,
  caloricIntake: Number,
  BMI: Number,
  bodyFatPercentage: Number,
  BMR: Number,
  startingTDEE: Number,
  dailyCaloricIntake: Number,
  proteinIntake: Number,
  fatsIntake: Number,
  carbohydratesIntake: Number,
  weightChangePerWeek: Number,
  dietaryPreferences: [String],
  // Additional fields can be added as needed
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;
