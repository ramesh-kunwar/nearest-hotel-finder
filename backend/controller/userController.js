const express = require("express");
const axios = require("axios");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const Token = require("../model/tokenSchema");
const { expressjwt } = require("express-jwt");

const crypto = require("crypto");
const mailSender = require("../utils/mailSender");

const { generateToken } = require("../utils/generateToken");

// Function to get coordinates from address using OpenCage API
async function getCoordinates(address) {
  const apiKey = process.env.OPEN_CAGE_API_KEY; // Replace with your actual API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  const response = await axios.get(url);

  if (response.data.results.length > 0) {
    const location = response.data.results[0].geometry;
    return [location.lng, location.lat]; // Return coordinates [longitude, latitude]
  }
  throw new Error("Location not found");
}

/********************************************
 *      @description register User
 *      @route       POST /api/v1/auth/register
 *      @access      Public
 *      @param       {name, email, password, phoneNumber}
 *      @method POST
 /********************************************/

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNumber, address } = req.body;

  if (!name || !email || !password) {
    throw new ErrorResponse("All fields are required", 400);
    // return res.status(400).json({ error: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ErrorResponse("User already exist", 400);
  }

  // Get coordinates from the location string
  const coordinates = await getCoordinates(address);

  const user = await User.create({
    name,
    email,
    password,
    phoneNumber,
    location: {
      type: "Point",
      coordinates: coordinates,
    },
    address,
  });

  res.status(200).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

/********************************************
 *      @description login User
 *      @route       POST /api/v1/auth/login
 *      @access      Public
 *      @param       {email, password}
 *      @method     POST
 * ********************************************/

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorResponse("All fields are required", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorResponse("Invalid credentials", 400);
  }
  if (!(await user.matchPassword(password))) {
    throw new ErrorResponse("Invalid credentials", 400);
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      isVerified: user.isVerified,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );

  user.password = undefined;

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie("jwt", token, options).status(200).json({
    success: true,
    msg: "Login success",
    user,
    token,
  });

  // res.cookie("token", token, options)
  // res.status.json({
  //   success: true,
  //   msg: "Login success",
  //   user,
  //   token,
  // })
});

exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", null, { expiresIn: Date.now() });
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
});

exports.sendOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw new ErrorResponse("Enter email", 400);
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ErrorResponse("User not found", 400);
  }

  const generatedToken = generateToken(user._id);

  const token = await Token.create({ token: generatedToken });
  token.user = user._id;

  await token.save();
  mailSender({
    email,
    title: "Email Verification",
    body: `Please activate your email by clicking the  <a href="http://localhost:4000/api/v1/user/auth/verify/${generatedToken}">URL</a>`,
  });

  // const URL = `http://localhost:4000/api/v1/user/auth/verify/${generatedToken}`;
  // await token.save();
  res.json({
    success: true,
    msg: "OTP sent successfully to email",
    token,
  });
});

/********************************************
 *      @description verify User
 *      @route       POST /api/v1/auth/verify
 *      @access      Private
 * ********************************************/

exports.verifyUser = asyncHandler(async (req, res, next) => {
  // const { token } =
  const token = await Token.findOne({ token: req.params.token });

  if (!token) {
    throw new ErrorResponse("Invalid token", 400);
  }

  const user = await User.findById(token.user);

  user.isVerified = true;
  await user.save();

  res.status(200).json({
    success: true,
    msg: "OTP verified successfully",
    user,
  });
});

/********************************************
 *     @description Get all User
 *  @route       GET /api/v1/auth/users
 * @access      Public
 * ********************************************/

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return res.status(400).json({ error: "SOmething went wrong" });
  }
  res.status(200).json({
    success: true,
    numberOfUsers: users.length,
    data: users,
  });
});

/********************************************
 *    @description Get single User
 * @route       GET /api/v1/auth/user/:id
 * @access      Public
 * ********************************************/

exports.getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ErrorResponse("User not found", 400);
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

/************************************************
 *  @description Get User Profile
 * @route /api/v1/auth/user/profile
 * @access Private
 ************************************************/

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("myBookings");

  if (!user) {
    throw new ErrorResponse("User not found", 400);
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

/********************************************
 * @description Reset Password Token
 * @route       POST /api/v1/auth/resetPasswordToken
 * @access      Private
 ********************************************/

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorResponse("User not found", 400);
  }

  const token = generateToken(user._id);

  await Token.create({ token, user: user._id });

  mailSender({
    email,
    title: "Reset Password",
    body: `Please click the link to reset your password <a href="http://localhost:4000/api/v1/user/resetPassword/${token}">Reset Password</a>`,
  });

  res.status(200).json({
    success: true,
    msg: "Reset password link sent to email",
    token,
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const userToken = await Token.findOne({ token: req.params.token });

  if (!userToken)
    return res.status(200).json({
      success: false,
      msg: "Invalid token",
    });

  // console.log(user, "user");

  const user = await User.findById(userToken.user);

  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      msg: "All fields are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      msg: "Password do not match",
    });
  }

  user.password = password;

  await user.save();

  return res.status(200).json({
    success: true,

    msg: "Password reset successfully",
  });
});

exports.isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // Make sure token is exists
  if (!token) {
    // return next(new ErrorResponse(`Not authorized to access this route`, 401));
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }

  // if token exists verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    console.log(req.cookies, "cookies");
    next();
  } catch (error) {
    // return next(new ErrorResponse(`Not authorized to access this route`, 401));
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }
});

exports.isAdmin = (req, res, next) => {
  console.log(req.user, " FROM ISADMIN FUNCTION IN user controller");
  if (req.user && req.user.role === 1) {
    next();
  } else {
    return next(new ErrorResponse(`Not authorized as admin`, 401));
  }
};
