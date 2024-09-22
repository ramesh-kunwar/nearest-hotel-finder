const express = require("express");
const {
  registerUser,
  loginUser,

  verifyUser,
  sendOtp,
  getAllUsers,
  getSingleUser,

  forgotPassword,
  resetPassword,
  getUserProfile,
  isLoggedIn,
  isAdmin,
  // sendOTP,
} = require("../controller/userController");
const { expressjwt } = require("express-jwt");

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/sendOtp", sendOtp);
router.get("/auth/verify/:token", verifyUser);
// router.get("/", isAdmin, getAllUsers);
// router.get("/", isLoggedIn, isAdmin, getAllUsers);
router.get("/", isLoggedIn, isAdmin,getAllUsers);
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

router.get("/:id", isLoggedIn, getSingleUser);
router.get("/:id/profile", isLoggedIn,  getUserProfile);
// router.get("/:id", isLoggedIn, getSingleUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

module.exports = router;
