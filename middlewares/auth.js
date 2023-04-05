const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');
const { UnauthorizedError } = require('./errors/UnauthorizedError');

const ERR_CODE_401 = 401;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // return res.status(ERR_CODE_401).send({ message: 'Authorization required' });
    return next(new UnauthorizedError('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // return res.status(ERR_CODE_401).send({ message: 'Authorization required' });
    return next(new UnauthorizedError('Authorization required'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
