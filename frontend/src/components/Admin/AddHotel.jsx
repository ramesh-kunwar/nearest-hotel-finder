import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCredentials } from "@/slices/authSlice";
import toast from "react-hot-toast";
import { API_URL } from "@/constants/constants";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";

const AddHotel = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo, " USER INFO");
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

  const { hotelName, address, phone, category, description, photo, formdata } =
    hotel;

  const { register, handleSubmit } = useForm();
  let file_ref = useRef();

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    if (e.target.name === "image") {
      formdata.set("image", e.target.files[0]);
    } else {
      setHotel({ ...hotel, [e.target.name]: e.target.value });
      formdata.set(e.target.name, e.target.value);
    }
  };

  const handleAddHotel = (e) => {
    e.preventDefault();
    console.log(formdata);
    axios({
      method: "post",
      url: `${API_URL}/hotels`,
      data: formdata,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        console.log(response);
        // dispatch(setCredentials(data));
        console.log("Hotel Detail Added Successfully");
        toast.success("Hotel Detail Added Successfully");
        // navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
      });
  };

  //   const onSubmit = (data) => {
  //     console.log(data);

  //     const formData = new FormData();
  //     formData.append("hotelName", data.hotelName);
  //     formData.append("address", data.address);
  //     formData.append("phone", data.phone);
  //     formData.append("category", data.category);
  //     formData.append("description", data.description);
  //     formData.append("photo", data.photo[0]);

  //     // axios
  //     //   .post(`${API_URL}/hotels`, { data: formData },

  //     //     { withCredentials: true },)
  //     //   .then(function (response) {
  //     //     console.log(response);
  //     //     // dispatch(setCredentials(data));
  //     //     console.log("Hotel Detail Added Successfully");
  //     //     toast.success("User Registered Successfully");
  //     //     // navigate("/");
  //     //   })
  //     //   .catch(function (error) {
  //     //     console.log(error);
  //     //     toast.error(error.message);
  //     //   });

  // console.log(formData)
  //     // axios({
  //     //   method: 'post',
  //     //   url: `${API_URL}/hotels`,
  //     //   data: formData,
  //     //   withCredentials: true,
  //     //   headers: {
  //     //     'Content-Type': 'multipart/form-data'
  //     //   }
  //     // })
  //     //   .then(function (response) {
  //     //     console.log(response);
  //     //     // dispatch(setCredentials(data));
  //     //     console.log("Hotel Detail Added Successfully");
  //     //     toast.success("User Registered Successfully");
  //     //     // navigate("/");
  //     //   })
  //     //   .catch(function (error) {
  //     //     console.log(error);
  //     //     toast.error(error.message);
  //     //   });
  //   };
  return (
    <>
      <div className="container mt-5 mx-auto">
        <Button className="bg-gray-700 text-white">
          <Link to="/admin/dashboard">Go To Dashboard</Link>
        </Button>
      </div>
      <div className="h-screen justify-between  flex items-center ">
        {/* <h1>hello</h1> */}
        <form
          onSubmit={handleAddHotel}
          className="md:max-w-2xl  container mx-auto "
        >
          <h1 className="text-2xl font-bold mb-7 text-center">
            {" "}
            Add Hotel Details
          </h1>
          <div className="mb-3">
            <Label htmlFor="hotelName" className="">
              Hotel Name
            </Label>
            <Input
              name="hotelName"
              type="text"
              value={hotelName}
              onChange={handleChange}
              placeholder="Hotel Name"
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="address" className="">
              Address
            </Label>
            <Input
              name="address"
              onChange={handleChange}
              value={address}
              type="text"
              placeholder="Address"
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="phone" className="">
              Phone
            </Label>
            <Input
              type="text"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="category" className="">
              Category
            </Label>
            <select
              onChange={handleChange}
              name="category"
              value={category}
              className="block bg-gray-50 border border-gray-300 w-full p-2 rounded-md"
            >
              <option>Choose Category</option>
              <option value="1 Star"> 1 Star</option>
              <option value="2 Star">2 Star</option>
              <option value="3 Star">3 Star</option>
              <option value="4 Star">4 Star</option>
              <option value="5 Star">5 Star</option>
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

          <div className="mb-3">
            <Label htmlFor="description"> Description</Label>
            <Textarea
              onChange={handleChange}
              name="description"
              value={description}
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
    </>
  );
};

export default AddHotel;
