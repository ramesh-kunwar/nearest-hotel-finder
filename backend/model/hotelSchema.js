const mongoose = require("mongoose");

// "hotelName": "Hotel 3",
// "description": "this is hotel 3",
// "address": "Hattiban",
// "phone": "1353423423423",
// "category": "5 star"

const hotelSchema = new mongoose.Schema(
  {
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    image: {
      type: String,
      // required: true,
    },

    hotelName: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },

    category: {
      type: String,
      // required: true,
      // enum: ["1 star", "2 star", "3 star", "4 star", "5 star"],
      enum: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hotel", hotelSchema);

// 1. name
// 2. address
// 3. phone
// 4. rooms_model → [array] → fk
// 5. category
//     1. 5star, 3star..
