const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    image: [
      {
        type: String,
      },
    ],
    roomNumber: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
      enum: ["available", "booked", "checked"],
      default: "available",
    },
    roomCategory: {
      type: String,
      enum: ["single", "double", "deluxe", "supreme deluxe"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);

// admin change status of booking
// usper admin -> add hotel
