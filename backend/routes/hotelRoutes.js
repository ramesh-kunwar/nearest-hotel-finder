const express = require("express");
const {
  getHotels,
  addHotels,
  getHotelById,
  addRooms,
  deleteHotel,
  updateHotel,
  findNearestHotel,
  getRoomById,
  editRoom,
} = require("../controller/hotelController");
const upload = require("./uploadRoutes");

const { isLoggedIn, isAdmin } = require("../controller/userController");
const router = express.Router();

router.post("/", upload.single("image"), isLoggedIn, isAdmin, addHotels);
router.get("/", getHotels);
router.get("/:hotelId", getHotelById);

router.delete("/:hotelId", deleteHotel);
router.put("/:hotelId", updateHotel);

// find nearest Hotel

router.get("/nearest", getHotels);

router.get("/nearest-hotel/:userId", isLoggedIn, findNearestHotel);

// rooms
router.post("/:hotelId/rooms", upload.array("image", 10), addRooms);
router.get("/:hotelId/:roomId", getRoomById);
router.put("/:hotelId/:roomId", editRoom)
module.exports = router;
