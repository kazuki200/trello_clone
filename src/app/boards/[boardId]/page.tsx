"use server";

import Board from "@/components/Board";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";

type PageProps = {
  params: {
    boardId: string;
  };
};

const Page = async (props: PageProps) => {
  const boardId = props.params.boardId;
  const userEmail = await getUserEmail();
  const boardInfo = await liveblocksClient.getRoom(boardId);
  const userAccess = boardInfo.usersAccesses?.[userEmail];
  const hasAccess = userAccess && [...userAccess].includes("room:write");

  if (!hasAccess) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <Board name={boardInfo.metadata.boardName as string} id={boardId} />
    </div>
  );
};

export default Page;
