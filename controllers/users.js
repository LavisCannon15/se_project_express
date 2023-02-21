const User = require('../models/users');

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(err);
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => res.status(500).send({ message: 'Error: getUsers failed', e }));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'NotValid Data' });
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'User not found' });
      } else {
        return res
          .status(500)
          .send({ message: 'An error has occurred on the server' });
      }
      return 0;
    });
};

module.exports = { createUser, getUsers, getUser };
