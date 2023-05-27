import AppError from "./../utils/appError.js";
import User from "../model/userModel.js";
import catchAsync from "./../utils/catchAsync.js";
import generateToken from "./../utils/generateToken.js";

// @desc rigester a new user
// route /api/users
// @access public
const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("User already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    next(new AppError("Invalid User data", 400));
  }
});

// @desc auth user/set token
// route /api/users/auth
// @access public
const authUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    next(new AppError("Invalid Email or Password", 401));
  }
});

// @desc logout user
// route /api/users/logout
// @access public
const logoutUser = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "User Logged Out",
  });
});

// @desc   get user profile
// route   /api/users/profile
// @access private
const getUser = catchAsync(async (req, res, next) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @desc   update user profile
// route   /api/users/profile
// @access private
const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    next(new AppError("User Not Found !", 404));
  }
});

export { registerUser, authUser, updateUser, getUser, logoutUser };
