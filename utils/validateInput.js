const validateInput = {
  logInInput(req, res, next) {
    if (typeof req.body.username === 'undefined') {
      return res.status(401).json({
        message: 'Username field must not be empty'
      });
    } else if (typeof req.body.password === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    }
    return next();
  }
};

export default validateInput;
