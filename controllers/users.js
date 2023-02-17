const User = require("../models/user");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        res.status(ERR_CODE_400).send(err);
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      res.status(500).send({ message: "Error: getUsers failed", e });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      res.status(500).send({ message: "Error: getUser failed", e });
    });
};

module.exports = { createUser, getUsers, getUser };
