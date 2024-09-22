const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../model/userSchema");
const RoomCategory = require("../model/roomCategorySchema");
const Hotel = require("../model/hotelSchema");
const Room = require("../model/roomSchema");
const Booking = require("../model/bookingSchema");
const axios = require('axios');

// Function to get coordinates from address using OpenCage API
async function getCoordinates(address) {

  const apiKey = process.env.OPEN_CAGE_API_KEY; // Replace with your actual API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  const response = await axios.get(url);

  if (response.data.results.length > 0) {
    const location = response.data.results[0].geometry;
    return [location.lng, location.lat]; // Return coordinates [longitude, latitude]
  }
  throw new Error('Location not found');
}



/*******************************************
 *     @description add booking
 *   @route       POST /api/v1/booking
 *  @access      Private
 * @param       {room, user, noOfGuests, checkIn, checkOut, amount, bookingDate}
 * @method POST

 /********************************************/

exports.addBooking = asyncHandler(async (req, res, next) => {
  // step 1. Find the room of particular hotel
  console.log(req.body, "req.body---------------------------------------- ");

  // console.log(req.params.id, 'aa hotel id')

  const hotel = await Hotel.findById(req.params?.hotelId).populate("rooms");

  const room = await Room.findById(req.params?.roomId);

  if (!hotel) {
    return next(new ErrorResponse("Hotel not found", 404));
  }

  if (!room) {
    return next(new ErrorResponse("Room not found", 404));
  }


  // console.log(req?.auth, 'req.auth---------------------------------------- ')
  room.bookedBy = req.auth.id;

  // take all data
  const { noOfGuests, checkIn, checkOut, amount, locationString } = req.body;
  console.log(noOfGuests, typeof noOfGuests, 'noOfGuests')

  // Convert checkIn and checkOut to Date objects
  const checkInDate = new Date(checkIn);

  const checkOutDate = new Date(checkOut);
  const today = new Date();


  if (room.availability === "booked") {
    throw new ErrorResponse("Room is already booked", 400);
  }

  const guestInNumber = Number(noOfGuests);

  const booking = await Booking.create({
    noOfGuests: guestInNumber,
    checkIn: checkInDate,
    checkOut: checkOutDate,

    room,


    hotel: hotel?.hotelName,

    amount: Number(room.price * guestInNumber),
    bookedBy: req.auth.id,
  });

  // room.availability = "occupied";

  const user = await User.findById(req.auth.id);
  const roomSchema = await Room.findByIdAndUpdate(room._id, {
    availability: "booked",
    bookedBy: req.auth.id,
  });

  user.myBookings.push(booking._id);

  await user.save();
  await roomSchema.save();


  if (!booking) {
    return next(new ErrorResponse("Booking failed", 400));
  }

  return res.status(200).json({
    success: true,
    message: "All Hotels",
    booking,
  });
});
