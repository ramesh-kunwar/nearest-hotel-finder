import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
export const AvailableRooms = ({ room }) => {
  console.log(room, "room from available rooms");
  const path = room?.image[0];
  const roomImagePath = path?.replace("../frontend/", "");
  return (
    <div className="bg-white">
      <Card>
        <div className="px-2  py-2 rounded-md">
          <img
            src={`../${roomImagePath}`}
            alt="room"
            className="w-full h-48 object-cover"
          />

          <div className="flex italic text-gray-500 items-center justify-between px-2 py-2">
            <p>
              {room?.availability.charAt(0).toUpperCase() +
                room?.availability.slice(1)}
            </p>
            <Badge className={"bg-green-200 py-2 text-green-900"}>
              Rs. {room?.price} / Night
            </Badge>
            {/* <p> */}
            {/*   <Badge className={`bg-orange-400 text-white`}> */}
            {/*     {room?.availability.charAt(0).toUpperCase() + */}
            {/*       room?.availability.slice(1)} */}
            {/*   </Badge> */}
            {/* </p> */}
            {/* <Badge className={`bg-green-300 italic`}> */}
            {/*   Rs. {room?.price} / Night */}
            {/* </Badge> */}
          </div>
        </div>
      </Card>
    </div>
  );
};
