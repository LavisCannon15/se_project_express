const router = require('express').Router();
const clothingItem = require('./clothingItem');
const users = require('./users');

const ERR_CODE_404 = 404;

router.use('/', clothingItem);
router.use('/', users);
router.use((req, res) => {
  res.status(ERR_CODE_404).send({ message: 'Router not found' });
});

module.exports = router;
