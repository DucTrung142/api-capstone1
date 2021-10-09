const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const bearer = req.header('Authorization') || req.header('authorization');
  const token = bearer.split('Bearer ')[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, verified) => {
    if (err) {
      res.status(403).json({ message: 'Invalid Token' });
      return;
    }

    req.user = verified;
    next();
  });
};
module.exports = verifyToken;
