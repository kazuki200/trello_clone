import { useStorage } from "@/app/liveblocks";
import React from "react";
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";

const Columns = () => {
  const columns = useStorage((root) => root.columns);
  if (!columns) {
    return;
  }

  return (
    <div className="flex gap-4">
      {columns.map((column) => (
        <Column key={column.id} {...column} setCards={() => {}} cards={[]} />
      ))}
      <NewColumnForm />
    </div>
  );
};

export default Columns;
