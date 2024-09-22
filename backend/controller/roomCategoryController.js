const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../model/userSchema");

/********************************************
 *      @description register User
 *      @route       POST /api/v1/auth/register
 *      @access      Public
 *      @param       {name, email, password, phoneNumber}
 *      @method POST
 /********************************************/

exports.registerUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "User registered successfully",
  });
});
