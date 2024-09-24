import { API_URL } from "@/constants/constants";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../ui/card";
import { Link } from "react-router-dom";
const Listing = () => {
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
  console.log(hotels, "Hotels found");
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-4xl font-black my-10">All Listings</h1>
        <div className="sm:block md:grid grid-cols-4 gap-5">
          {hotels?.map((hotel) => {
            const path = hotel?.image;

            const hotelImagePath = path?.replace("../frontend/", "");
            return (
              <div key={hotel?._id}>
                <Link to={`/hotel/${hotel._id}`} >
                  <Card>
                    <img
                      className="rounded-md w-full h-90"
                      src={`./${hotelImagePath}`}
                    />

                    <div className="px-4 py-6">
                      <h1 className="text-xl font-bold">{hotel?.hotelName}</h1>
                      <p className="my-2">{hotel?.description}</p>
                      <Badge
                        variant={"destructive"}
                        className={"bg-red-400 text-white"}
                      >
                        {hotel?.address}
                      </Badge>
                    </div>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Listing;
