const express = require("express");
const {
  registerUser,
  loginUser,

  verifyUser,
  sendOtp,
  getAllUsers,
  getSingleUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  isLoggedIn,
  isAdmin,
  updateProfile,
  updateUserProfile,
  // sendOTP,
} = require("../controller/userController");
const { expressjwt } = require("express-jwt");

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/logout", logoutUser);
router.post("/auth/sendOtp", sendOtp);
router.get("/auth/verify/:token", verifyUser);
// router.get("/", isAdmin, getAllUsers);
// router.get("/", isLoggedIn, isAdmin, getAllUsers);
router.get("/", getAllUsers);
// router.get("/",  getAllUsers);

// router.get(
//   "/",
//   expressjwt({ secret: "thisismyjwtsecret", algorithms: ["HS256"] }),
//   function (req, res) {
//     console.log(req.auth, "req auth");

//     if (req.auth.role != 1) return res.sendStatus(401);
//     res.sendStatus(200);
//   }
// );

router.get("/:id", getSingleUser);
router.get("/:id/profile", isLoggedIn, getUserProfile);
// router.put("/auth/update-profile", isLoggedIn, updateProfile); // New route for updating profile
// router.put("/auth/update-profile", isLoggedIn, updateProfile); // Update profile (New Route)
router.put("/:id/update-profile", isLoggedIn, updateUserProfile); // Update user profile or location (New Route)

// router.get("/:id", isLoggedIn, getSingleUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

module.exports = router;
