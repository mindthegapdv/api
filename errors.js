const NotFound = () => {
  const err = Error('Not Found');
  err.statusCode = 404;
  return err;
};

module.exports = { NotFound };
