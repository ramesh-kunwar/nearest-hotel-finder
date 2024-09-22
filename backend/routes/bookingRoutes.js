const express = require("express");
const { addBooking } = require("../controller/bookingController");
const { isLoggedIn, isAdmin } = require("../controller/userController");


const router = express.Router();
// router.post("/", upload.single("image"), addHotels);
// router.get("/", getHotels);
// router.get("/:id", getHotelById);

// router.delete("/:id", deleteHotel);
// router.put("/:id", updateHotel);


// // rooms
// // rooms



// router.post("/:id/rooms", addRooms);
router.post("/hotels/:hotelId/rooms/:roomId", isLoggedIn, addBooking);
// router.get("/hotels/:id/rooms/:id", addBooking);

module.exports = router;




// let name = "Ramesh kunwar";
// let email = "RAMESH@GMAIL.OM";
