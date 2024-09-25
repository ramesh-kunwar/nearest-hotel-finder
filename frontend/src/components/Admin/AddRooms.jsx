import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setCredentials } from "@/slices/authSlice";
import toast from "react-hot-toast";
import { API_URL } from "@/constants/constants";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";

const AddRooms = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo, " USER INFO");
  // getting hotel <details>

  const { hotelId } = useParams();
  console.log(hotelId, "hotel id from Add rooms Page");

  const [room, setRoom] = useState({
    roomNumber: "",
    availability: "",
    roomCategory: "",
    price: 0,
    formdata: new FormData(),
  });

  const { roomNumber, availability, roomCategory, price, formdata } = room;

  const { register, handleSubmit } = useForm();
  let file_ref = useRef();

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    if (e.target.name === "image") {
      formdata.set("image", e.target.files[0]);
    } else {
      setRoom({ ...room, [e.target.name]: e.target.value });
      formdata.set(e.target.name, e.target.value);
    }
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    console.log(formdata);
    axios({
      method: "post",
      url: `${API_URL}/hotels/${hotelId}/rooms`,
      data: formdata,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        console.log(response);
        // dispatch(setCredentials(data));
        console.log("Hotel Room Added Successfully");
        toast.success("Hotel Room Added Successfully");
        // navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <div className="h-screen justify-between  flex items-center ">
      {/* <h1>hello</h1> */}

      <form
        onSubmit={handleAddRoom}
        className="md:max-w-2xl  container mx-auto "
      >
        <h1 className="text-2xl font-bold mb-7 text-center">
          {" "}
          Add Room Details
        </h1>
        <div className="mb-3">
          <Label htmlFor="roomNumber" className="">
            Room Number
          </Label>
          <Input
            name="roomNumber"
            type="text"
            value={roomNumber}
            onChange={handleChange}
            placeholder=" Room Number"
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label htmlFor="Price" className="">
            Price
          </Label>
          <Input
            name="price"
            onChange={handleChange}
            value={price}
            type="number"
            placeholder="Price"
            className="w-full"
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="roomCategory" className="">
            Room Category
          </Label>
          <select
            onChange={handleChange}
            name="roomCategory"
            value={roomCategory}
            className="block bg-gray-50 border border-gray-300 w-full p-2 rounded-md"
          >
            <option>Choose Category</option>
            <option value="single"> Single</option>
            <option value="double">Double</option>
            <option value="deluxe">Deluxe</option>
            <option value="supreme deluxe">Supreme Deluxe</option>
          </select>
        </div>

        <div className="mb-3">
          <Label htmlFor="availability" className="">
            Room Availability
          </Label>
          <select
            onChange={handleChange}
            name="availability"
            value={availability}
            className="block bg-gray-50 border border-gray-300 w-full p-2 rounded-md"
          >
            <option>Choose Category</option>
            <option value="available"> Available</option>
            <option value="checked">Checked</option>
            <option value="booked">Booked</option>
          </select>
        </div>

        <div className="mb-3">
          <Label htmlFor="photo">Upload an Image</Label>
          {/* <Input 
          onChange=(onFileChange)
          
          type="file" {...register("photo")}  /> */}
          <Input
            type="file"
            name="image"
            onChange={handleChange}
            ref={file_ref}
          />
        </div>

        <div className="mt-5">
          <Button
            type="submit"
            className="w-full bg-primary bg-black text-white"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRooms;
