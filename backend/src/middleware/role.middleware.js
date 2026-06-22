const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    console.log("Role middleware executed");

    // Demo mode: allow all users
    next();
  };
};

module.exports = roleMiddleware;