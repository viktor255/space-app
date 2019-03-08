const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];
      jwt.verify(token, process.env.JWT_KEY_OPERATOR);
      next();
    } catch (error) {
      res.status(401).json({message: 'Auth token not recognized'});
    }
  }
};
