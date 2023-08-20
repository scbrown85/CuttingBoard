// UserProfile Schema 
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  age: Number,
  weight: Number,
  height: Number,
  activityLevel: String,
  dietaryPreferences: [String],
  // Additional fields can be added as needed
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;
