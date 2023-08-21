const usersController = require('../controllers/usersController');
const UserProfile = require('../models/userProfile');

const mockUserData = {
  email: 'test@example.com',
  password: 'password123',
  age: 38,
  weight: 170,
  height: 69,
  activityLevel: 'moderate',
  waist: 35,
  neck: 16,
  gender: "Male",
  // Add other fields as needed
};

describe('Update Profile', () => {
    it('should update the user profile and calculate macronutrient intake', async () => {
      // Create a new user
      const user = new UserProfile(mockUserData);
      await user.save();
  
      // Mock request and response objects
      const req = {
        userData: { _id: user._id },
        body: {
          age: 26, // Updated age
          // Other updated fields
        },
      };
      const res = {
        send: (message) => {
          // Check the success message
          expect(message).toBe('User profile updated successfully.');
        },
      };
  
      // Call the updateProfile function
      await usersController.updateProfile(req, res);
  
      // Retrieve the updated user and check the calculations
      const updatedUser = await UserProfile.findById(user._id);
      expect(updatedUser.age).toBe(26);
      // Add other checks for calculated fields
    }, 60000); // 60 seconds timeout
});


  