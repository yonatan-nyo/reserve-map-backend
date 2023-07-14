function ErrorHandler(err, req, res, next) {
  console.log(err);
  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeForeignKeyConstraintError"
  ) {
    res.status(400).json({
      errors: err.errors.map((el) => el.message.charAt(0).toUpperCase() + el.message.slice(1)),
    });
  } else if (err.name === "Unauthenticated" || err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    res.status(401).json({
      errors: "Invalid token, please re-login",
    });
  } else if (err.name === "invalidPrice") {
    res.status(400).json({
      errors: "Invalid Price",
    });
  } else if (err.name === "MidtransError") {
    res.status(400).json({
      errors: err.ApiResponse.error_messages[0],
    });
  } else if (err.name === "DeletedUser") {
    res.status(400).json({
      errors: "Account was deleted",
    });
  } else {
    res.status(500).json({
      errors: "Internal server error",
    });
  }
}

module.exports = ErrorHandler;
