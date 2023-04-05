const router = require('express').Router();
const auth = require('../middlewares/auth');
const { NotFoundError } = require("../middlewares/errors/NotFoundError");

const clothingItem = require('./clothingItem');
const users = require('./users');

const ERR_CODE_404 = 404;

router.use('/items', clothingItem);
router.use('/users', users);
router.use(auth, (req, res) => {
  next(new NotFoundError("Item not found"));
  //res.status(ERR_CODE_404).send({ message: 'Router not found' });
});

module.exports = router;
