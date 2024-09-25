import { API_URL } from "@/constants/constants";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Badge } from "../ui/badge";
import { AvailableRooms } from "./rooms/AvailableRooms";
import Navbar from "../Navbar/Navbar";
const ListingById = () => {
  const { hotelId } = useParams();

  const [hotel, setHotel] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/hotels/${hotelId}`)
      .then((response) => {
        setHotel(response?.data?.hotel);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [hotelId]);

  const path = hotel?.image;

  const hotelImagePath = path?.replace("../frontend/", "");

  console.log(hotel, "hotel from listing by id");
  return (
    <>
      <Navbar />
      <div className="container mx-auto  ">
        <div className="grid grid-cols-3 gap-6 mt-5">
          <div className=" bg-blue-200 md:max-w-xl px-10 py-10">
            <h1 className="text-4xl font-bold my-5">{hotel?.hotelName}</h1>
            <img
              src={`../${hotelImagePath}`}
              className="rounded-2xl "
              alt="hotel"
            />
            <h2 className="text-2xl font-bold">{hotel?.address}</h2>
            <p className="text-l my-4">
              {" "}
              <span className="font-bold text-l"> Contact: </span>
              {hotel?.phone}
            </p>
            <p className="text-l my-4">
              {" "}
              <span className="font-bold text-l"> Category: </span>
              <Badge className={"bg-orange-500 text-white"}>
                {hotel?.category}
              </Badge>
            </p>
            <p className="text-l my-4">
              {" "}
              <span className="font-bold text-l"> Description: </span>
              {hotel?.description}
            </p>
          </div>
          <div className=" col-span-2  px-4 py-5">
            <h1 className="text-4xl font-bold my-5">Available Rooms</h1>
            <div className="grid grid-cols-2 gap-6 container">
              {hotel?.rooms?.map((room) => {
                console.log(room, "listing by id room");
                return (
                  <Link key={room?._id} to={`/hotel/${hotelId}/${room?._id}`}>
                    <AvailableRooms room={room} />
                  </Link>
                );
              })}
              {/* <AvailableRooms /> */}
              {/* <AvailableRooms /> */}
              {/* <AvailableRooms /> */}
              {/* <AvailableRooms /> */}
              {/* <AvailableRooms /> */}
              {/* <AvailableRooms /> */}

              {/* {hotel?.rooms?.map((room) => (
              <div className="bg-blue-300 p-5 rounded-lg">
                <h2 className="text-2xl font-bold">{room?.roomType}</h2>
                <p className="text-l my-4">
                  {" "}
                  <span className="font-bold text-l"> Price: </span>
                  {room?.price}
                </p>
                <p className="text-l my-4">
                  {" "}
                  <span className="font-bold text-l"> Capacity: </span>
                  {room?.capacity}
                </p>
                <p className="text-l my-4">
                  {" "}
                  <span className="font-bold text-l"> Availability: </span>
                  {room?.availability}
                </p>
              </div>
            ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingById;
