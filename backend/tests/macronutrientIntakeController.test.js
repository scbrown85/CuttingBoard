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
      // Tests for calculateBMR
    });
  
    describe('calculateStartingTDEE', () => {
      // Tests for calculateStartingTDEE
    });
  
    describe('calculateDailyCaloricIntake', () => {
      // Tests for calculateDailyCaloricIntake
    });
  
    describe('calculateProteinIntake', () => {
      // Tests for calculateProteinIntake
    });
  
    describe('calculateFatsIntake', () => {
      // Tests for calculateFatsIntake
    });
  
    describe('calculateCarbohydratesIntake', () => {
      // Tests for calculateCarbohydratesIntake
    });
  
    describe('calculateEstimatedWeightChange', () => {
      // Tests for calculateEstimatedWeightChange
    });
  });
  