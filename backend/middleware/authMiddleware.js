import AppError from "../utils/appError.js";
import User from "../model/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";

const protect = catchAsync(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      next(new AppError("Not Athorized, Invalid Token", 401));
    }
  } else {
    next(new AppError("Not Athorized, No Token", 401));
  }
});

export { protect };
