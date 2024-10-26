import { API_URL } from "@/constants/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import LoadingComponent from "../LoadingComponent";

const NearestListing = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [hotels, setHotels] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay of 2 seconds before showing the main content
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  console.log(userInfo, "from nearest listing");
  useEffect(() => {
    axios
      .get(`${API_URL}/hotels/nearest-hotel/${userInfo?._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setHotels(response?.data?.hotels);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(hotels, "hotel found");

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading && <LoadingComponent />}
      {!loading && (
        <div className="container max-w-6xl mx-auto">
          <h1 className="text-4xl font-black py-10">All Listings</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hotels?.map((hotel) => {
              const path = hotel?.image;

              const hotelImagePath = path?.replace(/^.*\/public/, "/public");
              return (
                <div key={hotel?._id} className="">
                  <Link to={`/hotel/${hotel._id}`}>
                    <Card className="pb-4 bg-white">
                      <div className="">
                        <img
                          className="rounded-xl h-48 w-full object-cover"
                          src={`./${hotelImagePath}`}
                          alt={hotel?.hotelName}
                        />
                      </div>
                      <div className="px-4 py-2">
                        <h1 className="text-md font-bold">
                          {hotel?.hotelName}
                        </h1>
                        <p className="my-2 font-light text-gray-600 flex items-center gap-2 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
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
                        </p>

                        <div className="flex items-center justify-between">
                          <p className="bg-red-500 inline rounded-xl px-3 py-1 text-white text-xs">
                            {hotel?.category}
                          </p>
                          <p className="italic text-gray-500">
                            {hotel?.distance}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NearestListing;
