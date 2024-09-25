import Navbar from "@/components/Navbar/Navbar";
import { API_URL } from "@/constants/constants";
import { Button } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RoomById = () => {
  const { hotelId, roomId } = useParams();
  const [room, setRoom] = useState({
    availability: "",
    image: [],
    price: 0,
    roomCategory: "",
    roomNumber: "",
    _id: "",
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/hotels/${hotelId}/${roomId}`,
        );
        setRoom(response?.data?.room || {}); // Fallback to an empty object if no room is found
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoom();
  }, [hotelId, roomId]);

  console.log(room, "room from room by id");

  // Destructure room details safely
  const { availability, image, price, roomCategory, roomNumber, _id } = room;

  // Check if image exists before accessing its first element
  const roomImagePath =
    image.length > 0 ? image[0].replace("../frontend/", "") : "";

  console.log(roomImagePath, "room image path");

  return (
    <>
      <Navbar />
      <div className="container mx-auto grid grid-cols-2 gap-6 my-5">
        <div>
          <img src={`/${roomImagePath}`} />
        </div>
        <div>
          room by id
          <Button className={"px-6 py-3 bg-blue-700 text-white rounded-md"}>
            Book Now
          </Button>
          <h1 className="text-xl">{room?.roomNumber}</h1>
        </div>
      </div>
    </>
  );
};

export default RoomById;
