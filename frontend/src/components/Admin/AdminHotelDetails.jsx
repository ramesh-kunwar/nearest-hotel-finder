import { API_URL } from "@/constants/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import EditRooms from "./EditRooms";
const AdminHotelDetails = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState("");
  useEffect(() => {
    axios.get(`${API_URL}/hotels/${hotelId}`).then((data) => {
      setHotel(data?.data?.hotel);
    });
  }, []);

  const handleDelete = (rooms) => {
    console.log("handle delete:width: ,");
  };

  const handleRoomUpdate = (updatedRoom) => {
    setHotel(prevHotel => ({
      ...prevHotel,
      rooms: prevHotel.rooms.map(room => 
        room._id === updatedRoom._id ? updatedRoom : room
      )
    }));
  };

  console.log(hotel, "From hotel");
  return (
    <div className="container mx-auto my-8">
      {/* <Button className="bg-gray-700 text-white"> */}
      {/*   <Link to="/admin/dashboard"> Go Back</Link> */}
      {/* </Button> */}
      <div className="my-10">
        <h1 className="font-bold sm:text-xl md:text-3xl">
          {" "}
          Available Rooms For {hotel?.hotelName}
        </h1>
      </div>

      <div className="my-10">
        <Button className="bg-green-600 text-white">
          <Link to={`/admin/hotels/${hotelId}/rooms`}> Add Rooms</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room ID</TableHead>
            <TableHead>Room Number</TableHead>
            <TableHead className="">Room Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Booked By</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotel?.rooms?.map((room) => {
            console.log(room);
            return (
              <TableRow key={Math.random()}>
                <TableCell className="">
                  <Link to={`/admin/hotels/${room?._id}`}>{room?._id}</Link>
                </TableCell>
                <TableCell>{room?.roomNumber}</TableCell>
                <TableCell>{room?.roomCategory}</TableCell>
                <TableCell>Rs. {room?.price}</TableCell>
                <TableCell>{room?.bookedBy || "-"}</TableCell>
                <TableCell>{room?.availability.toUpperCase()}</TableCell>
                <TableCell className="flex  items-center gap-2">
                  <div className="flex gap-3 items-center">
                    {/* <EditRooms /> */}
                    <EditRooms room={room} onUpdate={handleRoomUpdate} />

                    <Button onClick={handleDelete} className="bg-red-500">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}

          <TableRow>
            <TableCell>Table row 1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminHotelDetails;
