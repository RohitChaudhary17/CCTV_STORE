import ApiError from "../Utils/ApiError.utils.js";

const IsAdmin = (req, res, next) => {
  // Check if the user exists and has the role of 'admin'
  if (!req.user || req.user.role !== 'admin') {
    return next(ApiError(403 , 'Unauthorized user account type: User'))
  }

  // If the user is an admin, proceed to the next middleware or route handler
  next();
};

export default IsAdmin;
