"use client";

import { redirect } from "next/navigation";
import { createBoard } from "../actions/boardActions";

const Page = () => {
  async function handleNewBoardSubmit(formData: FormData) {
    const boardName = formData.get("name")?.toString() || "";
    const { id } = await createBoard(boardName);
    redirect(`/board/${id}`);
    // const boardName = formData.get("name")?.toString() || "";
    // const roomInfo = await createBoard(boardName);
    // if (roomInfo) {
    //   redirect(`/boards/${roomInfo.id}`);
    // }
  }

  return (
    <div>
      <form action={handleNewBoardSubmit} className="max-w-xs block">
        <h1 className="text-2xl mb-4">Create new board</h1>
        <input type="text" name="name" placeholder="board name" />
        <button type="submit" className="mt-2 w-full">
          Create board
        </button>
      </form>
    </div>
  );
};

export default Page;
