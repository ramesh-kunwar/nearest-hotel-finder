import { useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo, "User infor from profile route");
  return (
    <div className="">
      <div className="md:grid md:grid-cols-3 gap-8 container mx-auto max-w-7xl my-5">
        <div>
          <h1 className="md:text-4xl font-bold sm:text-2xl">
            {userInfo?.name}
          </h1>
          <div className="my-6">
            <Label>Full Name</Label>
            <Input
              className="my-2 border-black"
              type={"text"}
              value={userInfo?.name}
            />
          </div>
          <div className="my-6">
            <Label>Email</Label>
            <Input
              className="my-2 border-black"
              type={"email"}
              disabled
              value={userInfo?.email}
            />
          </div>
          <div className="my-6">
            <Label>Address</Label>
            <Input
              className="my-2 border-black"
              type={"address"}
              value={userInfo?.address}
            />
            <div className="my-6">
              <Input
                type="submit"
                className="my-2  bg-green-500 text-white"
                value="Update Profile"
              />
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <h1 className="md:text-4xl sm:text-2xl font-bold">My Bookings</h1>

          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">ID</TableHead>
                  <TableHead className="">Hotel</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">0101233</TableCell>
                  <TableCell>Hotel Annapurna</TableCell>
                  <TableCell>Check In</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
