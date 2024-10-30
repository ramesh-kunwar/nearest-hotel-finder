const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../model/userSchema");
const RoomCategory = require("../model/roomCategorySchema");
const Hotel = require("../model/hotelSchema");
const Room = require("../model/roomSchema");
const axios = require("axios");
const haversine = require("../utils/haversine");

// Function to get coordinates from address using OpenCage API
// async function getCoordinates(address) {
//   const apiKey = process.env.OPEN_CAGE_API_KEY; // Replace with your actual API key
//   const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//     address
//   )}&key=${apiKey}`;

//   const response = await axios.get(url);

//   if (response.data.results.length > 0) {
//     // Filter results for exact matches based on the formatted address
//     const exactMatch = response.data.results.find((result) => {
//       // Check if the formatted address exactly matches the input address
//       const formattedAddress = result.formatted.toLowerCase();
//       return formattedAddress === address.toLowerCase();
//     });

//     // If an exact match is found, return the coordinates
//     if (exactMatch) {
//       const location = exactMatch.geometry;
//       return [location.lng, location.lat]; // Return coordinates [longitude, latitude]
//     } else {
//       throw new Error("Exact location not found");
//     }
//   }
//   throw new Error("Location not found");
// }

async function getCoordinates(address) {
  const apiKey = process.env.OPEN_CAGE_API_KEY; // Replace with your actual API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address,
  )}&key=${apiKey}`;

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

exports.addHotels = asyncHandler(async (req, res, next) => {
  const { hotelName, description, address, phone, category, rooms } = req.body;

  console.log(req?.file, "filee path");
  console.log(req?.files, "filee path");
  console.log(req.body);
  const coordinates = await getCoordinates(address);
  console.log(coordinates, "COORDINATES............................");

  const hotels = await Hotel.create({
    hotelName,
    description,
    address,
    phone,
    category,
    image: req.file?.path,
    location: {
      type: "Point",
      coordinates: coordinates,
    },
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
  console.log(req.params.hotelId, "get hotel by id params controller");
  const hotel = await Hotel.findById(req.params.hotelId).populate("rooms");
  // const hotel = await Hotel.findById(req.params.hotelId).populate("rooms");

  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404),
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
    },
  );

  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404),
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
  console.log(hotel, "hotellllll");
  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404),
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
  const { userId } = req.params; // Expecting user ID from route parameters
  // const { rangeInKm = 1 } = req.query; // Get range from query params or default to 1 km
  const rangeInKm = 2; // Default range to 1 km
  // Convert range to meters
  const rangeInMeters = rangeInKm * 1000;

  // Fetch user by ID
  const user = await User.findById(userId);
  if (!user || !user.location || user.location.coordinates.length < 2) {
    return res.status(404).json({
      success: false,
      message: "User not found or location not available",
    });
  }

  const userLocation = user.location.coordinates;

  // Fetch all hotels
  const hotels = await Hotel.find();

  // Array to store nearby hotels
  const nearbyHotels = [];

  // Find hotels and calculate distances
  hotels.forEach((hotel) => {
    const hotelLocation = hotel.location.coordinates;

    // Use haversine to calculate distance in meters
    const distanceInMeters = haversine(userLocation, hotelLocation);

    // Convert distance to kilometers
    const distanceInKm = distanceInMeters / 1000;

    // Debugging: Log each distance calculated
    console.log(`Distance to ${hotel.hotelName}: ${distanceInKm} km`);

    if (distanceInMeters <= rangeInMeters) {
      // Check if the hotel is within the specified range
      nearbyHotels.push({
        hotel,
        distanceInKm,
      });
    }
  });

  if (nearbyHotels.length > 0) {
    // Sort by distance if needed
    nearbyHotels.sort((a, b) => a.distanceInKm - b.distanceInKm);

    res.status(200).json({
      success: true,
      length: nearbyHotels.length,
      hotels: nearbyHotels.map((entry) => ({
        ...entry.hotel._doc, // Spread hotel properties from the document
        distance: `${entry.distanceInKm.toFixed(2)} km away`, // Append actual distance and format to 2 decimal places
      })),
    });
  } else {
    res.status(404).json({
      success: false,
      message: `No hotels found within ${rangeInKm} km`,
    });
  }
});

exports.addRooms = asyncHandler(async (req, res, next) => {
  const { roomNumber, availability, roomCategory, price } = req.body;

  // const { name, price } = req.body.roomCategory;

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

// exports.editRoom = asyncHandler(async (req, res, next) => {
//   const { roomId } = req.params;
//   const { availability } = req.body;

//   // Validate the new availability status
//   const validStatuses = ["checked", "booked", "available"];
//   if (!validStatuses.includes(availability)) {
//     return res.status(400).json({
//       success: false,
//       message:
//         "Invalid availability status. Must be 'checked', 'booked', or 'available'.",
//     });
//   }

//   try {
//     // Find the room and update its availability
//     const updatedRoom = await Room.findByIdAndUpdate(
//       roomId,
//       { availability },
//       { new: true, runValidators: true },
//     );

//     if (!updatedRoom) {
//       return res.status(404).json({
//         success: false,
//         message: "Room not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Room status updated successfully",
//       room: updatedRoom,
//     });
//   } catch (error) {
//     console.error("Error updating room status:", error);
//     res.status(500).json({
//       success: false,
//       // message: "An error occurred while updating the room status",
//       message: error.message,
//     });
//   }
// });

exports.editRoom = asyncHandler(async (req, res, next) => {
  const { roomId, hotelId } = req.params; // Include hotelId in params
  const { availability, price, roomNumber, roomCategory } = req.body;

  // Validate the new availability status
  const validStatuses = ["checked", "booked", "available"];
  if (!validStatuses.includes(availability)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid availability status. Must be 'checked', 'booked', or 'available'.",
    });
  }

  try {
    // Find the room and ensure it belongs to the specified hotel
    // const updatedRoom = await Room.findOneAndUpdate(
    //   { _id: roomId, hotel: hotelId }, // Add hotel check
    //   { availability },
    //   { new: true, runValidators: true },
    // );
    //

    const foundHotel = await Hotel.findOne({ _id: hotelId }).populate("rooms");
    if (!foundHotel) {
      return res.status(404).json({
        success: false,
        message: "Room not found or doesn't belong to the specified hotel",
      });
    }

    // find room in hotel if it matches the hotelId
    const foundRoom = foundHotel.rooms.find((room) => room._id == roomId);

    // console.log(foundHotel);

    // return res.status(200).json({
    //   data: foundRoom,
    //   // data: foundHotel,
    //   hotelId: hotelId,
    //   roomId: roomId,
    // });

    const updatedRoom = await Room.findOneAndUpdate(
      // { _id: roomId, hotel: hotelId }, // Add hotel check
      { _id: foundRoom._id },
      {
        availability,
        price,
        roomNumber,
        roomCategory,
      },
      { new: true, runValidators: true },
    );

    if (!foundRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found or doesn't belong to the specified hotel",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room status updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    next(new Error(`Error updating room status: ${error.message}`));
  }
});

exports.getRoomById = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId;
  const hotel = await Hotel.findOne({ _id: req.params.hotelId }).populate(
    "rooms",
  );

  const room = hotel.rooms.find((room) => room._id.toString() === roomId);

  return res.status(200).json({
    msg: "Room by id",
    room,
  });
});

exports.getRoomCategories = asyncHandler(async (req, res, next) => {
  const roomCategories = await RoomCategory.find();

  res.status(200).json({
    success: true,
    message: "All Room Categories",
    length: roomCategories.length,
    roomCategories,
  });
});
