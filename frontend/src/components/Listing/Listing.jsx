import { API_URL } from "@/constants/constants";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../ui/card";
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
        <div className="flex flex-wrap md:flex-nowrap justify-between   gap-5 mt-5">
          {hotels?.map((hotel) => {
            return (
              <Card key={hotel?._id}>
                <img
                  className="rounded-md"
                  src="https://a0.muscache.com/im/pictures/ae71d719-bb9b-466d-aa76-c29a1d43afd7.jpg?ml=true&im_w=1200"
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
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Listing;
