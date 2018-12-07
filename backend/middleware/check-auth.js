const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    // console.log('token is: ' + token);
    jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    // console.log('Auth middleware failed');
    // console.log(error);
    res.status(401).json({message: 'Auth token not recognized'});
  }
};
