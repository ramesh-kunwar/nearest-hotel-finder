import React, { useState, useCallback } from "react";
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
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState(room.availability);
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
        // `localhot:/api/v1/hotels/${hotelId}/rooms/${room._id}/update`,
        `${API_URL}/hotels/${hotelId}/${room?._id}/update`,

        { availability },
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
      }
      setOpen(newOpen);
    },
    [room.availability],
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
              <div className="grid grid-cols-4 items-center gap-4">
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
