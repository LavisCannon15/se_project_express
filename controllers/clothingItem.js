const ClothingItem = require('../models/clothingItem');

const ERR_CODE_200 = 200;
const ERR_CODE_400 = 400;
const ERR_CODE_403 = 403;
const ERR_CODE_404 = 404;
const ERR_CODE_500 = 500;

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({
    name, weather, imageUrl, owner,
  })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_CODE_400).send({ message: 'Invalid data' });
      }
      return res.status(ERR_CODE_500).send({ message: 'Server error' });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(ERR_CODE_200).send(items))
    .catch((err) => res.status(ERR_CODE_500).send({ message: 'Error: getItems failed', err }));
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(ERR_CODE_404).send({ message: 'Item not found' });
      }
      if (item.owner.equals(req.user._id)) {
        return item.remove(() => res.send({ clothingItem: item }));
      }
      return res.status(ERR_CODE_403).send({
        message: "You do not have permission to delete another user's item",
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_CODE_400).send({ message: 'Invalid item ID' });
      }
      console.error(err);
      return res.status(ERR_CODE_500).send({ message: 'Server error' });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res.status(ERR_CODE_404).send({ message: 'Item not found' });
      }
      return res.status(ERR_CODE_200).send({ item });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_CODE_400).send({ message: 'Invalid ID' });
      }
      return res.status(ERR_CODE_500).send({ message: 'Error: getItems failed', err });
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res.status(ERR_CODE_404).send({ message: 'Item not found' });
      }
      return res.status(ERR_CODE_200).send({ item });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_CODE_400).send({ message: 'Invalid ID' });
      }
      return res.status(ERR_CODE_500).send({ message: 'Error: getItems failed', err });
    });
};

/*
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: "Error: updateItems failed", e });
    });
};
*/

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
