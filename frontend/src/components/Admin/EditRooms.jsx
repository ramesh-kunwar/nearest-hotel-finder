import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API_URL } from "@/constants/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

const EditRooms = ({ room, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState(room.availability);
  const [price, setPrice] = useState(room.price);
  const [roomCategory, setRoomCategory] = useState(room.roomCategory);
  const [isLoading, setIsLoading] = useState(false);
  const { hotelId } = useParams();
  console.log(hotelId, "-----------------hotelId-----------------");
  console.log(room, "-----------------room-----------------");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(room?._id, "Room id");

    try {
      const response = await axios.put(
        `${API_URL}/hotels/${hotelId}/${room?._id}/update`,
        { availability, price, roomCategory },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        toast.success("Room status updated successfully");
        onUpdate(response.data.room);
        setOpen(false);
      } else {
        toast.error(response.data.message || "Failed to update room status");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while updating the room status";
      toast.error(errorMessage);
      console.error("Error updating room status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = useCallback(
    (newOpen) => {
      if (!newOpen) {
        setAvailability(room.availability); // Reset form on close
        setPrice(room.price);
        setRoomCategory(room.roomCategory);
      }
      setOpen(newOpen);
    },
    [room.availability, room.price, room.roomCategory],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Room Status</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              {/*  */}
              <div className="grid grid-cols-4 items-center gap-4 justify-between">
                <Label htmlFor="availability" className="text-right">
                  Availability
                </Label>
                <div className="col-span-3">
                  <Select
                    value={availability}
                    onValueChange={setAvailability}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="booked">Booked</SelectItem>
                      <SelectItem value="checked">Checked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/*  */}
              {/*  */}
              <div className="grid grid-cols-4 items-center gap-4 justify-between">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <div className="col-span-3">
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
              </div>
              {/*  */}
              {/*  */}
              <div className="grid grid-cols-4 items-center gap-4 justify-between">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <div className="col-span-3">
                  <Select
                    value={roomCategory}
                    onValueChange={setRoomCategory}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="supreme deluxe">
                        Supreme Deluxe
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/*  */}
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditRooms;
