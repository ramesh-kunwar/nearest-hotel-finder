const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getTest = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "Thi is test route",
  });
});

// 1. create cate
