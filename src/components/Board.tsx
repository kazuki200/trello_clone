"use client";
import React, { useState } from "react";
import NewColumnForm from "./forms/NewColumnForm";
import Column from "./Column";
import { RoomProvider } from "@/app/liveblocks";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";

const defalutColumns = [
  { id: "col1", name: "todo", index: 0 },
  { id: "col2", name: "in progress", index: 1 },
  { id: "col3", name: "done", index: 2 },
];

export type CardType = {
  name: string;
  id: string | number;
  index: number;
  columnId: string;
};

const defalutCards = [
  { id: "afdv", name: "task 1", index: 0, columnId: "col1" },
  { id: "fdedddc", name: "task 5", index: 1, columnId: "col1" },
  { id: "fdec", name: "task 2", index: 1, columnId: "col2" },
  { id: "dddc", name: "task 3", index: 2, columnId: "col3" },
];

const Board = ({ id }: { id: string }) => {
  const [cards, setCards] = useState(defalutCards);
  const [columns, setColumns] = useState(defalutColumns);

  return (
    <RoomProvider
      id={id}
      initialPresence={{}}
      initialStorage={{ columns: new LiveList() }}
    >
      <ClientSideSuspense fallback={"Loading..."}>
        {() => (
          <>
            <Columns columns={columns} />
          </>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Board;
