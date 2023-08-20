// ShoppingList Routes 
const express = require('express');
const shoppingListsController = require('../controllers/shoppingListsController');

const router = express.Router();

router.post('/', shoppingListsController.createShoppingList);
router.get('/', shoppingListsController.getShoppingLists);
router.get('/:id', shoppingListsController.getShoppingList);
router.put('/:id', shoppingListsController.updateShoppingList);
router.delete('/:id', shoppingListsController.deleteShoppingList);

module.exports = router;
