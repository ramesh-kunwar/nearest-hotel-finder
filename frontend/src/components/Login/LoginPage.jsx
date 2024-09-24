import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCredentials } from "@/slices/authSlice";
import toast from "react-hot-toast";
import { API_URL } from "@/constants/constants";
// import { Form, useForm } from 'react-hook-form'

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${API_URL}/user/auth/login`, data, { withCredentials: true })
      // .post(`${API_URL}/user/auth/login`, data)

      .then(function (response) {
        console.log(response);
        dispatch(setCredentials(response?.data));
        console.log("User Logged In Successfully");
        toast.success("User Logged In Successfully");
        navigate("/");
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
        onSubmit={handleSubmit(onSubmit)}
        className="md:max-w-2xl  container mx-auto "
      >
        <h1 className="text-2xl font-bold mb-7 text-center">Login User</h1>
        <div className="mb-3">
          <Label htmlFor="email" className="">
            Email:
          </Label>
          <Input
            type="email"
            {...register("email", { required: true })}
            placeholder="email@gmail.com"
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Label htmlFor="password" className="">
            Password
          </Label>
          <Input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full"
          />
        </div>
        <div className="mb-3">
          <Button
            type="submit"
            className="w-full bg-primary bg-black text-white"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
