"use client";
import React, { useState } from "react";
import { RoomProvider } from "@/app/liveblocks";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";

export type CardType = {
  name: string;
  id: string | number;
  index: number;
  columnId: string;
};

const Board = ({ id }: { id: string }) => {
  return (
    <RoomProvider
      id={id}
      initialPresence={{}}
      initialStorage={{ columns: new LiveList(), cards: new LiveList() }}
    >
      <ClientSideSuspense fallback={"Loading..."}>
        {() => (
          <>
            <Columns />
          </>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Board;
