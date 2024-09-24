import { API_URL } from "@/constants/constants"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"



const NearestListing = () => {
  const { userInfo } = useSelector(state => state.auth)
  const [hotels, setHotels] = useState([{}])

  console.log(userInfo?._id, 'from nearest listing')
  useEffect(() => {
    axios.get(`${API_URL}/hotels/nearest-hotel/${userInfo?._id}`, { withCredentials: true })
      .then((response) => {
        console.log(response)
        setHotels(response?.data?.hotels)
      }).catch(error => {
        console.log(error)
      })


  }, [])
  console.log(hotels, 'hotel found')

  return (
    <div>

      <div className="container mx-auto">
        <h1 className="text-4xl font-black my-10">All Listings</h1>
        <div className="sm:block md:grid grid-cols-4 gap-5">
          {hotels?.map((hotel) => {
            const path = hotel?.image;

            const hotelImagePath = path?.replace("../frontend/", "");
            console.log(hotel, 'hotellllll.....')
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
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={"destructive"}
                          className={"bg-red-400 text-white"}
                        >
                          {hotel?.address}
                        </Badge>
                        <Badge
                          variant={"destructive"}
                          className={"bg-red-400 text-white"}
                        >
                          {hotel?.distance}
                        </Badge>

                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default NearestListing