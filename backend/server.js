const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const mealPlanRoutes = require('./routes/mealPlans');
const shoppingListRoutes = require('./routes/shoppingLists');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Welcome message for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to CuttingBoard.ai backend!');
});

// User-related routes
app.use('/users', userRoutes);

// Meal plan-related routes
app.use('/mealPlans', mealPlanRoutes);

// Shopping list-related routes
app.use('/shoppingLists', shoppingListRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/cuttingboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
