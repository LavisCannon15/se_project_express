const router = require('express').Router();
const auth = require('../middlewares/auth');

const clothingItem = require('./clothingItem');
const users = require('./users');

const ERR_CODE_404 = 404;

router.use('/items', auth, clothingItem);
router.use('/users', auth, users);
router.use(auth, (req, res) => {
  res.status(ERR_CODE_404).send({ message: 'Router not found' });
});

module.exports = router;
