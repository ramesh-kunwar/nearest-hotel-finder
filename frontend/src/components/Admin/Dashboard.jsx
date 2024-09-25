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
import { API_URL } from "@/constants/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [hotels, setHotels] = useState([{}]);

  useEffect(() => {
    // hoatesl
    axios
      .get(`${API_URL}/hotels`)
      .then((response) => {
        setHotels(response?.data?.hotels);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(hotels, "hotels from admin");

  const handleDelete = (hotel) => {
    console.log(hotel);
    console.log("Delte handdler");

    axios

      .delete(`${API_URL}/hotels/${hotel._id} `, { withCredentials: true })
      .then(() => {
        setHotels((prevHotels) =>
          prevHotels.filter((h) => h._id !== hotel._id),
        );
        toast.success("Hotel Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error while deleting hotel");
      });
  };
  return (
    <div className="container  mx-auto my-3">
      <h1 className="text-4xl font-bold my-5"> Available Hotels</h1>

      <Button className="bg-green-400 my-10">
        <Link to={"/admin/addHotel"}> Add Hotel</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead className="">Hotel Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotels?.map((hotel) => {
            return (
              <TableRow key={Math.random()}>
                <TableCell className="">
                  <Link to={`/admin/hotels/${hotel?._id}`}>{hotel?._id}</Link>
                </TableCell>
                <TableCell>{hotel?.hotelName}</TableCell>
                <TableCell>{hotel?.category}</TableCell>
                <TableCell>{hotel?.phone}</TableCell>
                <TableCell>{hotel?.address}</TableCell>
                <TableCell className="flex  items-center gap-2">
                  <Button className="bg-blue-500 text-white">Update</Button>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => handleDelete(hotel)}
                  >
                    {" "}
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export const hotels = [
  {
    name: "Ocean View Hotel",
    price: 120,
    booked: false,
  },
  {
    name: "Mountain Peak Resort",
    price: 200,
    booked: true,
  },
  {
    name: "City Central Inn",
    price: 90,
    booked: false,
  },
  {
    name: "Grand Palace Hotel",
    price: 250,
    booked: true,
  },
  {
    name: "Lakeside Retreat",
    price: 180,
    booked: false,
  },
  {
    name: "Sunset Boulevard Hotel",
    price: 220,
    booked: true,
  },
  {
    name: "The Royal Gardens",
    price: 300,
    booked: false,
  },
];

export default Dashboard;
