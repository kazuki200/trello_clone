"use client";
import React, { FormEvent, useState } from "react";
import { RoomProvider } from "@/app/liveblocks";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { updateBoard } from "@/app/actions/boardActions";
import { metadata } from "@/app/layout";
import { useRouter } from "next/navigation";
import { BoardContextProvider } from "./BoardContext";

const Board = ({ id, name }: { id: string; name: string }) => {
  const [renameMode, setRenameMode] = useState(false);
  const router = useRouter();

  async function handleNameSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector("input");
    if (input) {
      const newName = input?.value;
      await updateBoard(id, { metadata: { boardName: newName } });
      input.value = "";
      setRenameMode(false);
      router.refresh();
    }
  }

  return (
    <BoardContextProvider>
      <RoomProvider
        id={id}
        initialPresence={{}}
        initialStorage={{ columns: new LiveList(), cards: new LiveList() }}
      >
        <ClientSideSuspense fallback={"Loading..."}>
          {() => (
            <>
              <div className="flex gap-2 justify-between items-center mb-4">
                {!renameMode && (
                  <h1 className="text-2xl" onClick={() => setRenameMode(true)}>
                    Board: {name}
                  </h1>
                )}
                {renameMode && (
                  <form onSubmit={handleNameSubmit}>
                    <input type="text" defaultValue={name} />
                  </form>
                )}
                <Link
                  className="flex gap-2 items-center btn"
                  href={`/boards/${id}/settings`}
                >
                  <FontAwesomeIcon icon={faCog} />
                  Board settings
                </Link>
              </div>
            </>
          )}
        </ClientSideSuspense>
        <Columns />
      </RoomProvider>
    </BoardContextProvider>
  );
};

export default Board;
