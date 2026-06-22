const auth = (req, res, next) => {
  req.user = {
    userId: "6a3661d492872f8f034c8aaf",
    role: "user"
  };

  next();
};

module.exports = auth;