const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'POKEMON_ATTRAPEZ_LES_TOUS');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw '403: Unauthorized Request';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};