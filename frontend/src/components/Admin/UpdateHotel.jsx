import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setCredentials } from "@/slices/authSlice";
import toast from "react-hot-toast";
import { API_URL } from "@/constants/constants";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";

const UpdateHotel = () => {
  const { hotelId } = useParams(); // Hotel ID from the route params
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    hotelName: "",
    address: "",
    phone: "",
    category: "",
    description: "",
    formdata: new FormData(),
  });

  const [loading, setLoading] = useState(true); // To handle initial loading state

  const { hotelName, address, phone, category, description, photo, formdata } =
    hotel?.hotel;

  const { register, handleSubmit } = useForm();
  let file_ref = useRef();

  useEffect(() => {
    // Fetch the hotel data based on the ID when the component mounts
    axios
      .get(`${API_URL}/hotels/${hotelId}`)
      .then((response) => {
        const hotelData = response.data;
        setHotel({
          ...hotelData,
          formdata: new FormData(),
        });
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to load hotel details");
        setLoading(false);
      });
  }, [hotelId]);

  console.log(hotel);
  console.log(hotelName, "hotl name");
  const handleChange = (e) => {
    if (e.target.name === "image") {
      formdata.set("image", e.target.files[0]);
    } else {
      setHotel({ ...hotel, [e.target.name]: e.target.value });
      formdata.set(e.target.name, e.target.value);
    }
  };

  const handleUpdateHotel = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${API_URL}/hotels/${hotelId}`,
      data: formdata,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        console.log(response);
        toast.success("Hotel Detail Updated Successfully");
        navigate("/admin/dashboard"); // Redirect after update
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
      });
  };

  if (loading) {
    return <div>Loading hotel data...</div>; // Add a loading state
  }

  return (
    <>
      <div className="container mt-5 mx-auto">
        <Button className="bg-gray-700 text-white">
          <Link to="/admin/dashboard">Go To Dashboard</Link>
        </Button>
      </div>
      <div className="h-screen justify-between flex items-center">
        <form
          onSubmit={handleUpdateHotel}
          className="md:max-w-2xl container mx-auto"
        >
          <h1 className="text-2xl font-bold mb-7 text-center">
            Update Hotel Details
          </h1>
          <div className="mb-3">
            <Label htmlFor="hotelName">Hotel Name</Label>
            <Input
              name="hotelName"
              type="text"
              value={hotelName || ""}
              onChange={handleChange}
              placeholder="Hotel Name"
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="address">Address</Label>
            <Input
              name="address"
              type="text"
              value={address || ""}
              onChange={handleChange}
              placeholder="Address"
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="phone">Phone</Label>
            <Input
              name="phone"
              type="text"
              value={phone || ""}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="category">Category</Label>
            <select
              onChange={handleChange}
              name="category"
              value={category || ""}
              className="block bg-gray-50 border border-gray-300 w-full p-2 rounded-md"
            >
              <option>Choose Category</option>
              <option value="1 Star">1 Star</option>
              <option value="2 Star">2 Star</option>
              <option value="3 Star">3 Star</option>
              <option value="4 Star">4 Star</option>
              <option value="5 Star">5 Star</option>
            </select>
          </div>

          <div className="mb-3">
            <Label htmlFor="photo">Upload an Image</Label>
            <Input
              type="file"
              name="image"
              onChange={handleChange}
              ref={file_ref}
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={description || ""}
              onChange={handleChange}
              placeholder="Enter description here"
            />
          </div>

          <div className="mt-5">
            <Button
              type="submit"
              className="w-full bg-primary bg-black text-white"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateHotel;
