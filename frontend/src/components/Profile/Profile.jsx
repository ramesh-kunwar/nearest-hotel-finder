import { useSelector, useDispatch } from "react-redux";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { API_URL } from "@/constants/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { setCredentials } from "@/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: e.target.name.value.trim(),
      address: e.target.address.value.trim(),
    };

    if (!updatedData.name || !updatedData.address) {
      toast.error("Name and address are required!");
      return;
    }

    try {
      // .put(`${API_URL}/user/auth/update-profile`, data) // No token required
      const response = await axios.put(
        `${API_URL}/user/auth/update-profile`,
        updatedData,
        {
          withCredentials: true,
        }
      );

      // Update Redux state with new user data
      dispatch(setCredentials(response.data.data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="md:grid md:grid-cols-3 gap-8 container mx-auto max-w-7xl my-5">
        <form onSubmit={handleUpdateProfile}>
          <div>
            <h1 className="md:text-4xl font-bold sm:text-2xl">
              {userInfo?.name}
            </h1>
            <div className="my-6">
              <Label htmlFor="name">Full Name</Label>
              <Input
                className="my-2 border-black"
                type="text"
                name="name"
                defaultValue={userInfo?.name || ""}
              />
            </div>
            <div className="my-6">
              <Label htmlFor="email">Email</Label>
              <Input
                className="my-2 border-black"
                type="email"
                disabled
                defaultValue={userInfo?.email || ""}
              />
            </div>
            <div className="my-6">
              <Label htmlFor="address">Address</Label>
              <Input
                className="my-2 border-black"
                type="text"
                name="address"
                defaultValue={userInfo?.address || ""}
              />
            </div>
            <div className="my-6">
              <Button
                type="submit"
                className="my-2 bg-green-500 text-white w-full"
              >
                Update Profile
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
