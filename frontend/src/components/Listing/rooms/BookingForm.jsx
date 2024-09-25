import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/constants/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
const BookingForm = ({ room }) => {
  console.log("room ", room);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  // const { hotelId, roomId } = useParams();
  // useEffect(() => {
  //   async function fetchRoom() {
  //     await axios
  //       .get(`${API_URL}/hotels/:{${hotelId}/${roomId}`)
  //       .then((response) => {
  //         console.log(response, "response from booking");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [hotelId, roomId]);
  //
  const handleChange = (value) => {
    setValue(value);
    console.log(value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const startDate = new Date(value.startDate);
    const endDate = new Date(value.endDate);
    // Calculate the time difference in milliseconds
    const timeDifference = endDate - startDate;

    // Convert the difference from milliseconds to days
    const numberOfDays = timeDifference / (1000 * 60 * 60 * 24);

    console.log(numberOfDays); // Output: 2
    console.log(startDate);
    console.log(endDate);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <Label className="my-5">When Do You Want To Book A Room</Label>
        <Datepicker value={value} onChange={() => handleChange(value)} />
        <div className="mt-10">
          <div className="mb-3">
            <Label className="mb-2">No of Days</Label>
            <Input type="text" placeholder="Address" className="w-full" />
          </div>
          <div className="mb-3">
            <Label className="mb-2">Room Category</Label>
            <Input
              type="text"
              placeholder="Address"
              disabled
              value={room?.roomCategory}
              className="w-full text-black"
            />
          </div>
          <Button
            onClick={submitHandler}
            className={"px-6 py-3 bg-blue-700 text-white rounded-md"}
          >
            Book Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
