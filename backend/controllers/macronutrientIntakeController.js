 
// Calculate BMI
function calculateBMI(weight, height) {
    if (weight <= 0 || height <= 0) return null;
    return weight && height ? (weight / (height * height)) * 703 : null;
  }
  
  function calculateBodyFatPercentage(gender, waist, hips, neck, height) {
    // Check for missing or invalid values
    if (!gender || !waist || !neck || !height || (gender === 'Female' && !hips)) {
      return null;
    }
  
    // Check for zero or negative values in the logarithm arguments
    if (height <= 0 || (gender === 'Male' && waist - neck <= 0) || (gender === 'Female' && waist + hips - neck <= 0)) {
      return null;
    }
  
    if (gender === 'Male') {
      return (86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76) / 100;
    } else if (gender === 'Female') {
      return (163.205 * Math.log10(waist + hips - neck) - 97.684 * Math.log10(height) - 78.387) / 100;
    } else {
      return null; // Handle error or missing values
    }
  }
  
  
  // Calculate BMR
  function calculateBMR(age, height, weight) {
    return weight > 0 && height > 0 && age > 0 ? (weight * (1 / 2.2)) * 10 + 6.25 * (height * 2.54) - 5 * age + 5 : null;
  }
  
  
  // Calculate Starting TDEE
  function calculateStartingTDEE(activityLevel, BMR) {
    const activityMultiplier = {
      Sedentary: 1.15,
      Light: 1.275,
      Moderate: 1.475,
      'Very Active': 1.675,
      'Extra Active': 1.875,
    };
  
    if (activityLevel && BMR && activityMultiplier[activityLevel] !== undefined) {
      return BMR * activityMultiplier[activityLevel];
    } else {
      return null;
    }
  }
  
  
  // Calculate Daily Caloric Intake
  function calculateDailyCaloricIntake(goalWeight, currentWeight, goalDate, startDate, TDEE) {
    if (!goalWeight || !currentWeight || !goalDate || !startDate || !TDEE || goalDate < startDate) {
      return null;
    }
    const daysToGoal = (goalDate - startDate) / (1000 * 60 * 60 * 24);
    return (500 * goalWeight - 500 * currentWeight) / (daysToGoal / 7) + TDEE;
  }
  
  
  // Calculate Protein Intake
  function calculateProteinIntake(gender, goalWeight, currentWeight, bodyFatPercentage) {
    if (gender === 'Male') {
      if (goalWeight < currentWeight) {
        if (bodyFatPercentage >= 0.25) return currentWeight * 0.6;
        if (bodyFatPercentage <= 0.08) return currentWeight * 1.2;
        return currentWeight * ((-3 * bodyFatPercentage) + 1.35);
      } else {
        if (bodyFatPercentage > 0.25) return currentWeight * 0.8;
        if (bodyFatPercentage > 0.16 && bodyFatPercentage <= 0.25) return currentWeight * 0.9;
        return currentWeight;
      }
    } else { // Female
      if (goalWeight < currentWeight) {
        if (bodyFatPercentage >= 0.32) return currentWeight * 0.6;
        if (bodyFatPercentage <= 0.18) return currentWeight * 1.2;
        return currentWeight * ((-3.75 * bodyFatPercentage) + 1.8);
      } else {
        if (bodyFatPercentage > 0.32) return currentWeight * 0.8;
        if (bodyFatPercentage > 0.23 && bodyFatPercentage <= 0.32) return currentWeight * 0.9;
        return currentWeight;
      }
    }
  }
  
  
  
  // Calculate Fats Intake
  function calculateFatsIntake(goalWeight, currentWeight) {
    if (goalWeight === null || currentWeight === null) return null; // Handling unexpected cases
    if (goalWeight < currentWeight) return currentWeight * 0.3;
    if (goalWeight > currentWeight) return currentWeight * 0.4;
    if (goalWeight === currentWeight) return currentWeight * 0.35;
    return null;
  }
  
  
  
  // Calculate Carbohydrates Intake
  function calculateCarbohydratesIntake(caloricIntake, protein, fats) {
    if (caloricIntake === null || protein === null || fats === null) return null;
    return (caloricIntake - (protein * 4 + fats * 9)) / 4;
  }
  
  
  // Calculate Estimated Weight Change Per Week
  function calculateWeightChangePerWeek(caloricIntake, TDEE) {
    if (caloricIntake === null || TDEE === null) {
      return null; // Return "I don't know" if one of the buckets is missing
    }
    return (caloricIntake - TDEE) / 500;
  }
  
  
  module.exports = {
    calculateBMI,
    calculateBodyFatPercentage,
    calculateBMR,
    calculateStartingTDEE,
    calculateDailyCaloricIntake,
    calculateProteinIntake,
    calculateFatsIntake,
    calculateCarbohydratesIntake,
    calculateWeightChangePerWeek,
  };
  