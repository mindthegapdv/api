const NotFound = () => {
  const err = Error('Not Found');
  err.statusCode = 404;
  return err;
};

const Unauthorized = () => {
  const err = Error('Unauthorized');
  err.statusCode = 401;
  return err;
};

module.exports = { NotFound, Unauthorized };
