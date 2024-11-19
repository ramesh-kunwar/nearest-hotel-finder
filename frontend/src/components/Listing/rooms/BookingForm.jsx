import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/constants/constants";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import { differenceInDays } from "date-fns";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const BookingForm = ({ room }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const hotelId = useParams().hotelId;
  const roomId = useParams().roomId;

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const [bookingDetails, setBookingDetails] = useState({
    numberOfDays: 0,
    totalPrice: 0,
    roomCategory: room?.roomCategory || "",
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (newValue) => {
    setValue(newValue);

    // Calculate the number of days and total price
    if (newValue.startDate && newValue.endDate) {
      const start = new Date(newValue.startDate);
      const end = new Date(newValue.endDate);
      const numberOfDays = differenceInDays(end, start);

      const totalPrice = Number(room.price) * numberOfDays;

      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        numberOfDays,
        totalPrice,
      }));
    } else {
      // Reset details if dates are cleared
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        numberOfDays: 0,
        totalPrice: 0,
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const bookingData = {
        checkIn: new Date(value.startDate).toISOString(),
        checkOut: new Date(value.endDate).toISOString(),
        user: userInfo._id,
        amount: bookingDetails.totalPrice,
        room: roomId,
      };

      const response = await axios({
        method: "post",
        url: `${API_URL}/booking/hotels/${hotelId}/rooms/${roomId}`,
        data: bookingData,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setBookingSuccess(true);
      setErrorMessage("");
      toast.success("Hotel Booked Successfully");
    } catch (error) {
      console.error("Error during booking:", error);
      setBookingSuccess(false);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Label className="my-5">When Do You Want To Book A Room</Label>
        <Datepicker
          value={value}
          onChange={handleChange}
          minDate={new Date()} // Disable past dates
        />

        <div className="mt-10">
          <div className="mb-3">
            <Label className="mb-2">Number of Days</Label>
            <Input
              type="text"
              disabled
              value={bookingDetails.numberOfDays || ""}
              className="w-full"
            />
          </div>

          <div className="mb-3">
            <Label className="mb-2">Total Price</Label>
            <Input
              type="text"
              disabled
              value={`Rs.${bookingDetails.totalPrice.toFixed(2) || "0.00"}`}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className={`px-6 py-3 text-white rounded-md ${
              room.availability === "booked"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700"
            }`}
            disabled={room.availability === "booked"}
          >
            {room.availability === "booked" ? "Already Booked" : "Book Now"}
          </Button>
        </div>
      </form>

      {/* Display success or error message */}
      {bookingSuccess && (
        <div className="mt-5 text-green-500">Booking Successful!</div>
      )}
      {errorMessage && (
        <div className="mt-5 text-red-500">Error: {errorMessage}</div>
      )}
    </div>
  );
};

export default BookingForm;
