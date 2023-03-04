const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Elise Bouer',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png',
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Invalid URL',
    },
  },
});

user.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((users) => {
      if (!users) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, users.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return users;
      });
    });
};

module.exports = mongoose.model('user', user);
