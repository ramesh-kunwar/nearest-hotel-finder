const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../model/userSchema");
const RoomCategory = require("../model/roomCategorySchema");
const Hotel = require("../model/hotelSchema");
const Room = require("../model/roomSchema");
const Booking = require("../model/bookingSchema");
const axios = require("axios");

exports.addBooking = asyncHandler(async (req, res, next) => {
  try {
    const { room, user, checkIn, checkOut, amount } = req.body;

    const parsedCheckIn = checkIn;
    const parsedCheckOut = checkOut;

    // Check if room exists
    const existingRoom = await Room.findById(room);
    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found." });
    }

    // Check if the room is already booked
    if (existingRoom.availability === "booked") {
      return res.status(400).json({ message: "This room is already booked." });
    }

    const booking = await Booking.create({
      room,
      user,
      checkIn: parsedCheckIn,
      checkOut: parsedCheckOut,
      amount,
    });

    const foundUser = await User.findById(user);

    foundUser.myBookings.push(booking._id);
    await foundUser.save();

    // Update room availability
    existingRoom.availability = "booked";
    await existingRoom.save();

    return res.status(201).json({
      message: "Booking created successfully",
      booking: booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the booking." });
  }
});
// exports.addBooking = asyncHandler(async (req, res, next) => {
//   try {
//     const { room, user, checkIn, checkOut, amount } = req.body;

//     const parsedCheckIn = checkIn;
//     const parsedCheckOut = checkOut;

//     // Check if room exists
//     const existingRoom = await Room.findById(room);
//     if (!existingRoom) {
//       return res.status(404).json({ message: "Room not found." });
//     }

//     const booking = await Booking.create({
//       room,
//       user,
//       checkIn: parsedCheckIn,
//       checkOut: parsedCheckOut,
//       amount,
//     });

//     const foundUser = await User.findById(user);

//     foundUser.myBookings.push(booking._id);
//     await foundUser.save();

//     return res.status(201).json({
//       message: "Booking created successfully",
//       booking: booking,
//     });
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     return res
//       .status(500)
//       .json({ message: "An error occurred while creating the booking." });
//   }
// });
