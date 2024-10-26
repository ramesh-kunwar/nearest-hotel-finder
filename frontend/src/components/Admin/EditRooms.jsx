import React, { useState } from "react";
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

const EditRooms = ({ room, onUpdate }) => {
  console.log(room, "room");
  console.log(API_URL);
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState(room.availability);
  const { hotelId } = useParams();
  console.log(hotelId, "hotel id");
  console.log(room._id, "room id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        // `${API_URL}/hotels/${hotelId}/rooms/${room._id}`,
        `https://localhost:4000/api/v1/hotels/${hotelId}/${room._id}`,
        { availability },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Room status updated successfully");
        onUpdate(response.data.room); // Update the room in the parent component
        setOpen(false); // Close the modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating room status:", error);
      toast.error("An error occurred while updating the room status");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Room Status</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="availability" className="text-right">
                  Availability
                </Label>
                <Select
                  value={availability}
                  onValueChange={(value) => setAvailability(value)}
                >
                  <SelectTrigger className="w-[180px]">
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
            <div className="flex justify-end">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditRooms;
