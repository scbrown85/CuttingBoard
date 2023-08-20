// MealPlan Routes 
const express = require('express');
const mealPlansController = require('../controllers/mealPlansController');

const router = express.Router();

router.post('/', mealPlansController.createMealPlan);
router.get('/', mealPlansController.getMealPlans);
router.get('/:id', mealPlansController.getMealPlan);
router.put('/:id', mealPlansController.updateMealPlan);
router.delete('/:id', mealPlansController.deleteMealPlan);

module.exports = router;
