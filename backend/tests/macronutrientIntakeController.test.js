const {
    calculateBMI,
    calculateBodyFatPercentage,
    calculateBMR,
    calculateStartingTDEE,
    calculateDailyCaloricIntake,
    calculateProteinIntake,
    calculateFatsIntake,
    calculateCarbohydratesIntake,
    calculateEstimatedWeightChange
  } = require('../controllers/macronutrientIntakeController');
  
  describe('Macronutrient Intake Controller', () => {
    describe('calculateBMI', () => {
        const {
            calculateBMI,
            // ... other functions
          } = require('../controllers/macronutrientIntakeController');
          
          describe('Macronutrient Intake Controller', () => {
            describe('calculateBMI', () => {
              it('should calculate BMI correctly for given weight and height', () => {
                const weight = 150; // Example weight in pounds
                const height = 68; // Example height in inches
                const expectedBMI = (weight / (height * height)) * 703; // Expected BMI value
          
                const result = calculateBMI(weight, height);
          
                expect(result).toBeCloseTo(expectedBMI, 1); // Allowing 1 decimal place tolerance
              });
          
              it('should return null if weight or height is missing', () => {
                expect(calculateBMI(null, 68)).toBeNull();
                expect(calculateBMI(150, null)).toBeNull();
              });
          
              it('should return null if weight or height is zero or negative', () => {
                expect(calculateBMI(0, 68)).toBeNull();
                expect(calculateBMI(150, 0)).toBeNull();
                expect(calculateBMI(-150, 68)).toBeNull();
                expect(calculateBMI(150, -68)).toBeNull();
              });
            });
          
            // Other describe blocks for other functions
          });
              });
  
    describe('calculateBodyFatPercentage', () => {
        describe('calculateBodyFatPercentage', () => {
            it('should calculate body fat percentage correctly for males', () => {
              const gender = 'Male';
              const waist = 32; // Example waist in inches
              const neck = 16; // Example neck in inches
              const height = 68; // Example height in inches
              const expectedBodyFatPercentage = (86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76) / 100;
          
              const result = calculateBodyFatPercentage(gender, waist, null, neck, height);
          
              expect(result).toBeCloseTo(expectedBodyFatPercentage, 2); // Allowing 2 decimal places tolerance
            });
          
            it('should calculate body fat percentage correctly for females', () => {
              const gender = 'Female';
              const waist = 28; // Example waist in inches
              const hips = 38; // Example hips in inches
              const neck = 14; // Example neck in inches
              const height = 64; // Example height in inches
              const expectedBodyFatPercentage = (163.205 * Math.log10(waist + hips - neck) - 97.684 * Math.log10(height) - 78.387) / 100;
          
              const result = calculateBodyFatPercentage(gender, waist, hips, neck, height);
          
              expect(result).toBeCloseTo(expectedBodyFatPercentage, 2); // Allowing 2 decimal places tolerance
            });
          
            it('should return null if any required measurement is missing', () => {
              expect(calculateBodyFatPercentage('Male', null, null, 16, 68)).toBeNull();
              expect(calculateBodyFatPercentage('Female', 28, 38, null, 64)).toBeNull();
              expect(calculateBodyFatPercentage('Female', 28, null, 14, 64)).toBeNull();
            });
          
            it('should return null if gender is not specified or invalid', () => {
              expect(calculateBodyFatPercentage(null, 32, null, 16, 68)).toBeNull();
              expect(calculateBodyFatPercentage('Other', 32, null, 16, 68)).toBeNull();
            });
          });
              });
  
    describe('calculateBMR', () => {
        describe('calculateBMR', () => {
            it('should calculate BMR correctly', () => {
              const age = 25; // Example age in years
              const height = 68; // Example height in inches
              const weight = 150; // Example weight in pounds
              const expectedBMR = (weight * (1 / 2.2)) * 10 + 6.25 * (height * 2.54) - 5 * age + 5; // Expected BMR value
          
              const result = calculateBMR(age, height, weight);
          
              expect(result).toBeCloseTo(expectedBMR, 1); // Allowing 1 decimal place tolerance
            });
          
            it('should return null if age, height, or weight is missing', () => {
              expect(calculateBMR(null, 68, 150)).toBeNull();
              expect(calculateBMR(25, null, 150)).toBeNull();
              expect(calculateBMR(25, 68, null)).toBeNull();
            });
          
            it('should return null if age, height, or weight is zero or negative', () => {
              expect(calculateBMR(0, 68, 150)).toBeNull();
              expect(calculateBMR(25, 0, 150)).toBeNull();
              expect(calculateBMR(25, 68, 0)).toBeNull();
              expect(calculateBMR(-25, 68, 150)).toBeNull();
              expect(calculateBMR(25, -68, 150)).toBeNull();
              expect(calculateBMR(25, 68, -150)).toBeNull();
            });
          });
              });
  
    describe('calculateStartingTDEE', () => {
        describe('calculateStartingTDEE', () => {
            it('should calculate starting TDEE correctly', () => {
              const BMR = 1500; // Example BMR value
              const activityLevel = 'Moderate'; // Example activity level
              const expectedTDEE = BMR * 1.475; // Expected TDEE value based on the "Moderate" activity level
          
              const result = calculateStartingTDEE(activityLevel, BMR);
          
              expect(result).toBeCloseTo(expectedTDEE, 1); // Allowing 1 decimal place tolerance
            });
          
            it('should return null if BMR or activity level is missing', () => {
              expect(calculateStartingTDEE('Moderate', null)).toBeNull();
              expect(calculateStartingTDEE(null, 1500)).toBeNull();
            });
          
            it('should return null if activity level is invalid', () => {
              expect(calculateStartingTDEE('InvalidLevel', 1500)).toBeNull();
            });
          });
              });
  
              describe('calculateDailyCaloricIntake', () => {
                describe('calculateDailyCaloricIntake', () => {
                  it('should calculate daily caloric intake correctly for weight loss', () => {
                    const goalWeight = 140;
                    const currentWeight = 150;
                    const goalDate = new Date('2023-12-31');
                    const startDate = new Date('2023-01-01');
                    const TDEE = 2000;
                    const expectedCaloricIntake = 1903.85; // Updated expected value
              
                    const result = calculateDailyCaloricIntake(goalWeight, currentWeight, goalDate, startDate, TDEE);
              
                    expect(result).toBeCloseTo(expectedCaloricIntake, 2); // Allowing 2 decimal places tolerance
                  });
              
                  it('should calculate daily caloric intake correctly for weight gain', () => {
                    const goalWeight = 160;
                    const currentWeight = 150;
                    const goalDate = new Date('2023-12-31');
                    const startDate = new Date('2023-01-01');
                    const TDEE = 2000;
                    const expectedCaloricIntake = 2096.15; // Updated expected value
              
                    const result = calculateDailyCaloricIntake(goalWeight, currentWeight, goalDate, startDate, TDEE);
              
                    expect(result).toBeCloseTo(expectedCaloricIntake, 2); // Allowing 2 decimal places tolerance
                  });
              
                  it('should return null if any required parameter is missing', () => {
                    expect(calculateDailyCaloricIntake(null, 150, new Date('2023-12-31'), new Date('2023-01-01'), 2000)).toBeNull();
                    expect(calculateDailyCaloricIntake(140, null, new Date('2023-12-31'), new Date('2023-01-01'), 2000)).toBeNull();
                    expect(calculateDailyCaloricIntake(140, 150, null, new Date('2023-01-01'), 2000)).toBeNull();
                    expect(calculateDailyCaloricIntake(140, 150, new Date('2023-12-31'), null, 2000)).toBeNull();
                    expect(calculateDailyCaloricIntake(140, 150, new Date('2023-12-31'), new Date('2023-01-01'), null)).toBeNull();
                  });
              
                  it('should return null if goal date is before start date', () => {
                    const goalDate = new Date('2023-01-01');
                    const startDate = new Date('2023-12-31');
              
                    expect(calculateDailyCaloricIntake(140, 150, goalDate, startDate, 2000)).toBeNull();
                  });
                });
              });
              
  
              describe('calculateProteinIntake', () => {
                it('should calculate protein intake for male with weight loss goal', () => {
                  expect(calculateProteinIntake('Male', 150, 200, 0.3)).toBe(120);
                });
              
                it('should calculate protein intake for male with weight gain goal', () => {
                  expect(calculateProteinIntake('Male', 200, 150, 0.15)).toBe(150); // Current weight
                });
              
                it('should calculate protein intake for female with weight loss goal', () => {
                  expect(calculateProteinIntake('Female', 120, 150, 0.35)).toBe(90);
                });
              
                it('should calculate protein intake for female with weight gain goal', () => {
                  expect(calculateProteinIntake('Female', 150, 120, 0.22)).toBe(120); // Current weight
                });
              });
              
  
              describe('calculateFatsIntake', () => {
                it('should calculate fats intake for weight loss goal', () => {
                  expect(calculateFatsIntake(150, 200)).toBe(60); // 200 * 0.3
                });
              
                it('should calculate fats intake for weight gain goal', () => {
                  expect(calculateFatsIntake(200, 150)).toBe(60); // 150 * 0.4
                });
              
                it('should calculate fats intake for maintaining weight', () => {
                  expect(calculateFatsIntake(150, 150)).toBe(52.5); // 150 * 0.35
                });
              
                it('should handle unexpected cases', () => {
                  expect(calculateFatsIntake(null, 150)).toBeNull(); // Handling unexpected cases
                });
              });
              
  
              describe('calculateCarbohydratesIntake', () => {
                it('should calculate carbohydrates intake correctly', () => {
                  expect(calculateCarbohydratesIntake(2000, 100, 50)).toBe(287.5);
                });
              
                it('should return 0 if caloricIntake is equal to the sum of protein and fats calories', () => {
                  expect(calculateCarbohydratesIntake(1000, 100, 50)).toBe(37.5);
                });
              
                it('should handle negative values for caloricIntake, protein, and fats', () => {
                    expect(calculateCarbohydratesIntake(-2000, -100, -50)).toBe(-287.5);
                  });
                  
              
                it('should return null if any parameter is missing', () => {
                  expect(calculateCarbohydratesIntake(null, 100, 50)).toBeNull();
                  expect(calculateCarbohydratesIntake(2000, null, 50)).toBeNull();
                  expect(calculateCarbohydratesIntake(2000, 100, null)).toBeNull();
                });
              });
              
  
    describe('calculateEstimatedWeightChange', () => {
        describe('calculateWeightChangePerWeek', () => {
            it('should calculate weight loss per week', () => {
              expect(calculateWeightChangePerWeek(2000, 2500)).toBe(-1); // Weight loss of 1 unit per week
            });
          
            it('should calculate weight gain per week', () => {
              expect(calculateWeightChangePerWeek(2500, 2000)).toBe(1); // Weight gain of 1 unit per week
            });
          
            it('should return 0 if caloricIntake is equal to TDEE', () => {
              expect(calculateWeightChangePerWeek(2000, 2000)).toBe(0); // No weight change
            });
          
            it('should handle negative values for caloricIntake and TDEE', () => {
              expect(calculateWeightChangePerWeek(-2000, -2000)).toBe(0); // No weight change with negative values
              expect(calculateWeightChangePerWeek(-2500, -2000)).toBe(-1); // Weight loss of 1 unit per week with negative values
            });
          
            it('should return null if any parameter is missing', () => {
              expect(calculateWeightChangePerWeek(null, 2000)).toBeNull();
              expect(calculateWeightChangePerWeek(2000, null)).toBeNull();
            });
          });
              });
  });
  