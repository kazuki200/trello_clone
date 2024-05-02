"use client";

import { RoomProvider } from "@/app/liveblocks";
import { BoardContextProvider } from "@/components/BoardContext";
import { LiveList } from "@liveblocks/client";
import { useParams } from "next/navigation";

type PageProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

function Layout({ children, modal }: PageProps) {
  const params = useParams();

  return (
    <>
      <BoardContextProvider>
        <RoomProvider
          id={params.boardId.toString()}
          initialPresence={{}}
          initialStorage={{
            columns: new LiveList(),
            cards: new LiveList(),
          }}
        >
          {children}
          {modal}
        </RoomProvider>
      </BoardContextProvider>
    </>
  );
}

export default Layout;
