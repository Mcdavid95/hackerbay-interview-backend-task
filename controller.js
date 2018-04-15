import jwt from 'jsonwebtoken';

export default {
  /**
   * login a new user
   * @param {object} req request object from input
   * @param {object} res reponse
   * @returns {object} json rsponse
   */
  login(req, res) {
    const token = jwt.sign(
      {
        username: req.body.username
      },
      process.env.SECRET
    );
    res.status(201).send({
      status: true,
      message: `Succesfully logged in as ${req.body.username}`,
      token
    });
  }
};
