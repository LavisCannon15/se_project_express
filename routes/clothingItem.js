const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/clothingItem');
const { createItemValidation, idValidation } = require('../middlewares/validation');
// CRUD

// CREATE
router.post('/', auth, createItemValidation, createItem);

// Read
router.get('/', getItems);

// Delete
router.delete('/:itemId', idValidation, auth, deleteItem);

// Like
router.put('/:itemId/likes', idValidation, auth, likeItem);

// Dislike
router.delete('/:itemId/likes', idValidation, auth, unlikeItem);

module.exports = router;
