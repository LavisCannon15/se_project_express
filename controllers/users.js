const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../middlewares/errors/BadRequestError');
const { ConflictError } = require('../middlewares/errors/ConflictError');
const { NotFoundError } = require('../middlewares/errors/NotFoundError');
const { ServerError } = require('../middlewares/errors/ServerError');
const { UnauthorizedError } = require('../middlewares/errors/UnauthorizedError');
const User = require('../models/users');

const { JWT_SECRET } = require('../utils/config');

const ERR_CODE_200 = 200;
const ERR_CODE_201 = 201;
const ERR_CODE_400 = 400;
const ERR_CODE_401 = 401;
const ERR_CODE_404 = 404;
const ERR_CODE_409 = 409;
const ERR_CODE_500 = 500;
const ERR_CODE_11000 = 11000;

const createUser = (req, res) => {
  const {
    name, email, password, avatar,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
        avatar,
      })
        .then((user) => {
          //const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          res.status(ERR_CODE_201).send({
            token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
            },
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            //return res.status(ERR_CODE_400).send({ message: 'Invalid datas' });
            next(new BadRequestError("Invalid data"));
          } if (err.code === ERR_CODE_11000) {
            //return res.status(ERR_CODE_409).send({ message: 'Email already exists' });
            next(new ConflictError("Email already exists"));
          }
          //return res.status(ERR_CODE_500).send({ message: 'Server error' });
          next(new ServerError("Server error"));
        });
    })
    .catch(() => next(new ServerError("Server error"))/*res.status(ERR_CODE_500).send({ message: 'An error has occurred on the server.' })*/);
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }),
      });
    })
    .catch(() => next(new UnauthorizedError("Login failed"))/*res.status(ERR_CODE_401).send({ message: 'Error: Login failed' })*/);
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        //return res.status(ERR_CODE_404).send({ message: 'User not found' });
        next(new NotFoundError("User not found"));
      }
      return res.status(ERR_CODE_200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        //return res.status(ERR_CODE_400).send({ message: 'NotValid Data' });
        next(new BadRequestError("Not valid data"))
      }
      //return res.status(ERR_CODE_500).send({ message: 'An error has occurred on the server' });
      next(new ServerError("An error has occured on the server"))
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        //return res.status(ERR_CODE_404).json({ message: 'User not found' });
         next(new NotFoundError("User not found"));
      }
      return res.status(ERR_CODE_200).json(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        //return res.status(ERR_CODE_400).send({ message: 'Invalid data' });
        next(new BadRequestError("Invalid data"));
      }
      //return res.status(ERR_CODE_500).send({ message: 'Server error' });
      next(new ServerError("An error has occured on the server"));
    });
};

module.exports = {
  createUser, login, getCurrentUser, updateUser,
};
