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

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${API_URL}/user/auth/register`, data)
      .then(function (response) {
        console.log(response);
        dispatch(setCredentials(data));
        console.log("User Registered Successfully");
        toast.success("User Registered Successfully");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="h-screen justify-between flex items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:max-w-2xl container mx-auto"
      >
        <h1 className="text-2xl font-bold mb-7 text-center">Register User</h1>

        {/* Name Field */}
        <div className="mb-3">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="Name"
            className="w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="email@gmail.com"
            className="w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Password"
            className="w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Address Field */}
        <div className="mb-3">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            {...register("address", {
              required: "Address is required",
            })}
            placeholder="Address"
            className="w-full"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="mb-3">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="text"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
            placeholder="Phone"
            className="w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-3">
          <Button
            type="submit"
            className="w-full bg-primary bg-black text-white"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
