"use client";
import { removeEmailFromBoard, updateBoard } from "@/app/actions/boardActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomAccesses } from "@liveblocks/node";
import { useRouter } from "next/navigation";
import React from "react";

export const EmailsAccessList = ({
  boardId,
  userAccesses,
}: {
  boardId: string;
  userAccesses: RoomAccesses;
}) => {
  const router = useRouter();
  async function handleDelete(emailToDelete: string) {
    await removeEmailFromBoard(boardId, emailToDelete);
    router.refresh();
  }

  return (
    <div className="max-w-xs">
      {Object.keys(userAccesses).map((email) => (
        <div
          key={email}
          className="flex gap-2 my-4 items-center max-w-xs justify-between border rounded-lg"
        >
          {email}
          <button className="btn p-1" onClick={() => handleDelete(email)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
};
