const router = require('express').Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require('../controllers/clothingItem');

// CRUD

// CREATE
router.post('/items', createItem);

// Read
router.get('/items', getItems);

// Update
router.put('/items/:itemId', updateItem);

// Delete
router.delete('/items/:itemId', deleteItem);

module.exports = router;
