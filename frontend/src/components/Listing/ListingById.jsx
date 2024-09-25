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

  const hotelImagePath = path?.replace(/^.*\/public/, "/public");
  console.log(hotel, "hotel from listing by id");
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto  ">
          <div className="grid md:grid-cols-3 gap-6 pt-5">
            <div className="bg-white md:rounded-2xl  sm:rounded-xl md:max-w-xl px-10 py-10">
              <img
                src={`../${hotelImagePath}`}
                className="rounded-2xl "
                alt="hotel"
              />
              <h1 className="md:text-4xl sm:text-2xl font-bold my-5">
                {hotel?.hotelName}
              </h1>
              <h2 className="flex items-centers gap-2 text-gray-500 text-xl font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                {hotel?.address}
              </h2>
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
              <div className="text-l my-4">
                {" "}
                <span className="font-bold  text-l"> Description: </span>
                <p>{hotel?.description}</p>
              </div>
            </div>
            <div className=" col-span-2  px-4 py-5">
              <h1 className="text-4xl font-bold my-5">Available Rooms</h1>
              <div className="grid grid-cols-2 gap-6 container">
                {hotel?.rooms?.length <= 0 && (
                  <h1 className="text-gray-700 font-bold text-xl">
                    No available rooms
                  </h1>
                )}
                {hotel?.rooms?.map((room) => {
                  console.log(room, "listing by id room");
                  return (
                    <Link key={room?._id} to={`/hotel/${hotelId}/${room?._id}`}>
                      <AvailableRooms room={room} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingById;
