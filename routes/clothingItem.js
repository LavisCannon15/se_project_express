const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/clothingItem');
// CRUD

// CREATE
router.post('/items', auth, createItem);

// Read
router.get('/items', getItems);

// Delete
router.delete('/items/:itemId', auth, deleteItem);

// Like
router.put('/items/:itemId/likes', auth, likeItem);

// Dislike
router.delete('/items/:itemId/likes', auth, unlikeItem);

module.exports = router;
