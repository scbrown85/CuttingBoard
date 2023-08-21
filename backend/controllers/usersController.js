const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserProfile = require('../models/userProfile');
const {
  calculateBMI,
  calculateBodyFatPercentage,
  calculateBMR,
  calculateStartingTDEE,
  calculateDailyCaloricIntake,
  calculateProteinIntake,
  calculateFatsIntake,
  calculateCarbohydratesIntake,
  calculateWeightChangePerWeek,
} = require('../controllers/macronutrientIntakeController'); // Importing the macronutrient intake functions

exports.register = async (req, res) => {
  // Check if the user already exists
  const existingUser = await UserProfile.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send('User already registered.');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user profile
  const user = new UserProfile({
    email: req.body.email,
    password: hashedPassword,
    // Other fields can be added as needed
  });

  // Save the user to the database
  await user.save();

  res.send('User registered successfully.');
};

exports.login = async (req, res) => {
  // Find the user by email
  const user = await UserProfile.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  // Check the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // Generate a JWT token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res.send(token);
};

exports.getProfile = async (req, res) => {
  // Find the user by ID
  const user = await UserProfile.findById(req.userData._id).select('-password');
  if (!user) return res.status(404).send('User not found.');

  // Send the user profile (excluding the password)
  res.send(user);
};

exports.updateProfile = async (req, res) => {
  // Find the user by ID
  const user = await UserProfile.findById(req.userData._id);
  if (!user) return res.status(404).send('User not found.');

  // Update the user profile with the provided data
  // You can customize this part based on the fields you want to allow updating
  user.age = req.body.age;
  user.weight = req.body.weight;
  user.height = req.body.height;
  user.activityLevel = req.body.activityLevel;
  // Other fields can be updated as needed

  // Calculate macronutrient intake based on the updated profile
  const BMI = calculateBMI(user.weight, user.height);
  const bodyFatPercentage = calculateBodyFatPercentage(user.gender, user.waist, user.hips, user.neck, user.height);
  const BMR = calculateBMR(user.age, user.height, user.weight);
  const startingTDEE = calculateStartingTDEE(user.activityLevel, BMR);
  const dailyCaloricIntake = calculateDailyCaloricIntake(user.goalWeight, user.currentWeight, user.goalDate, user.startDate, user.TDEE);
  const proteinIntake = calculateProteinIntake(user.gender, user.goalWeight, user.currentWeight, user.bodyFatPercentage);
  const fatsIntake = calculateFatsIntake(user.goalWeight, user.currentWeight);
  const carbohydratesIntake = calculateCarbohydratesIntake(dailyCaloricIntake, proteinIntake, fatsIntake);

  // You can now store these calculated values in the user profile or use them as needed
  // Example:
  user.BMI = BMI;
  user.bodyFatPercentage = bodyFatPercentage;
  user.BMR = BMR;
  user.startingTDEE = startingTDEE;
  user.dailyCaloricIntake = dailyCaloricIntake;
  user.proteinIntake = proteinIntake;
  user.fatsIntake = fatsIntake;
  user.carbohydratesIntake = carbohydratesIntake;
  user.weightChangePerWeek = weightChangePerWeek;

  // ... and so on ...

  
  // Save the updated user profile
  await user.save();

  res.send('User profile updated successfully.');
};
