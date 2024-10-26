const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // hotel: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Hotel",
    //   required: true,
    // },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    // roomCategory: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "RoomCategory",
    //   required: true,
    // },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // noOfGuests: {
    //   type: Number,
    //   required: true,
    // },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
