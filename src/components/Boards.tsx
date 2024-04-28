"use server";

import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import Link from "next/link";

const Boards = async () => {
  const email = await getUserEmail();
  const { data: rooms } = await liveblocksClient.getRooms({ userId: email });
  return (
    <div className="my-4 grid md:grid-cols-4 gap-2">
      {rooms.length > 0 &&
        rooms.map((room) => (
          <Link
            href={`/boards/${room.id}`}
            key={room.id}
            className="bg-gray-200 p-4 rounded-md block"
          >
            {room.metadata.boardName}
          </Link>
        ))}
    </div>
  );
};

export default Boards;
