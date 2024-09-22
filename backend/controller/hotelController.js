const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../model/userSchema");
const RoomCategory = require("../model/roomCategorySchema");
const Hotel = require("../model/hotelSchema");
const Room = require("../model/roomSchema");
const axios = require('axios');
const haversine = require("../utils/haversine");

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


/********************************************
 *      @description register User
 *      @route       POST /api/v1/auth/register
 *      @access      Public
 *      @param       {name, email, password, phoneNumber}
 *      @method POST
 /********************************************/

exports.addHotels = asyncHandler(async (req, res, next) => {
  const { hotelName, description, address, phone, category, rooms, locationString } = req.body;

  console.log(req?.file, "filee path");
  console.log(req?.files, "filee path");
  console.log(req.body);
  const coordinates = await getCoordinates(locationString);

  const hotels = await Hotel.create({
    hotelName,
    description,
    address,
    phone,
    category,
    image: req.file?.path,
    location: {
      type: 'Point',
      coordinates: coordinates,
    }
    // rooms: createdRoom._id,
    // roomCategory: createdRoomCategory._id,
  });

  res.status(200).json({
    success: true,
    message: "All Hotels",
    hotels,
  });
});

/********************************************
 *     @description get all Hotels
 *    @route       GET /api/v1/hotels
 *   @access      Public
 *   @method GET
 * ********************************************/

exports.getHotels = asyncHandler(async (req, res, next) => {
  const { category, address } = req.query;

  let query = {};

  if (category) {
    query.category = category;
  }

  if (address) {
    query.address = new RegExp(address, "i"); // i for case insensitive
  }

  const hotels = await Hotel.find(query).populate("rooms");

  res.status(200).json({
    success: true,
    message: "All Hotels",
    length: hotels.length,
    hotels,
  });
});
/********************************************
 *    @description get Hotel by id
 *   @route       GET /api/v1/hotels/:id
 * @access      Public
 * @method GET
 * ********************************************/
exports.getHotelById = asyncHandler(async (req, res, next) => {
  console.log(req.params, 'get hotel by id params controller')
  const hotel = await Hotel.findById(req.params.hotelId).populate("rooms");

  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Hotel",
    hotel,
  });
});

/********************************************
 *   @description update Hotel by id
 *  @route       PUT /api/v1/hotels/:id
 * @access      Public
 * @method PUT
 * ********************************************/
exports.updateHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndUpdate(
    // req.params.id,
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Hotel updated",
    hotel,
  });
});

/********************************************
 *  @description delete Hotel by id
 * @route       DELETE /api/v1/hotels/:id
 * @access      Public
 * @method DELETE
 * ********************************************/

exports.deleteHotel = asyncHandler(async (req, res, next) => {

  const hotel = await Hotel.findByIdAndDelete(req.params.hotelId);
  console.log(hotel, 'hotellllll')
  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Hotel deleted",
  });
});

/********************************************
 *   @description get rooms
 *    @route        /api/v1/hotels/:id/rooms
 *  @access      Public
 * @method POST
 *
 *******************************************/


/**
 * @description find Nearest hotels
 * @route       GET /api/v1/hotels/findNearby
 * @access      Public
 * @method GET
 * @param       {longitude, latitude, distance}
 */


exports.findNearestHotel = asyncHandler(async (req, res, next) => {

  // return res.status(200).json({
  //   message: 'Nearby hotels found',
  // })
  const { userId } = req.params; // Expecting user ID from route parameters

  // Fetch user by ID
  const user = await User.findById(userId);
  if (!user || !user.location || user.location.coordinates.length < 2) {
    return res.status(404).json({ message: 'User not found or location not available' });
  }

  const userLocation = user.location.coordinates;

  // Fetch all hotels
  const hotels = await Hotel.find();

  // Array to store hotels within 1 km
  const nearbyHotels = [];

  // Find hotels and calculate distances
  hotels.forEach((hotel) => {
    const hotelLocation = hotel.location.coordinates;
    const distance = haversine(userLocation, hotelLocation);

    if (distance < 500) { // Check if distance is less than 1 km
      nearbyHotels.push({
        hotel,
        distance,
      });
    }
  });

  if (nearbyHotels.length > 0) {
    // Sort by distance if needed
    nearbyHotels.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      length: nearbyHotels.length,

      hotels: nearbyHotels,
    });
  } else {
    res.status(404).json({ message: 'No hotels found within 1 km' });
  }

});



exports.addRooms = asyncHandler(async (req, res, next) => {
  const { roomNumber, availability, roomCategory, price } = req.body;

  // const { name, price } = req.body.roomCategory;

  // const createdRoomCategory = await RoomCategory.create({
  //   roomNumber,
  //   availability,
  //   roomCategory,
  //   price,
  // });
  // const files = req.files
  const roomImage = req.files.map((file) => file.path);
  // console.log(req.files, "files");

  // console.log(req.file, "files");
  const room = await Room.create({
    roomNumber,
    availability,
    roomCategory,
    price,
    image: roomImage,
  });

  console.log(req.params.hotelId, "hotel id");
  await Hotel.findByIdAndUpdate(req.params.hotelId, {
    $push: { rooms: room._id },
  });

  res.status(200).json({
    success: true,
    message: "Room added",
    room,
  });
});

/********************************************
 *  @description get all room categories
 * @route       GET /api/v1/roomCategories
 * @access      Public
 * @method GET
 *
 * ********************************************/

exports.getRoomCategories = asyncHandler(async (req, res, next) => {
  const roomCategories = await RoomCategory.find();

  res.status(200).json({
    success: true,
    message: "All Room Categories",
    length: roomCategories.length,
    roomCategories,
  });
});
