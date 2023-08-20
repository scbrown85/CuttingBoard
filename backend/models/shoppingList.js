// ShoppingList Schema 
const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Reference to the user
  items: [
    {
      name: String,
      quantity: Number,
      unit: String,
    },
  ],
  // Additional fields as needed
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);
module.exports = ShoppingList;
