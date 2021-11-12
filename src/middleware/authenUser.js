const authenticateRole = (roleArray) => (req, res, next) => {
  var authorized = false;
  //if user has a role that is required to access any API
  roleArray.forEach((role) => {
    authorized = req.user.user_type === role;
  });
  if (authorized == true) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: 'Unauthorized',
  });
};
module.exports = authenticateRole;
