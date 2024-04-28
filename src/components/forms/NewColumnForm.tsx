"use client";
import { useMutation, useStorage } from "@/app/liveblocks";
import { LiveObject } from "@liveblocks/client";
import React, { FormEvent } from "react";
import uniqid from "uniqid";

const NewColumnForm = () => {
  const addColumn = useMutation(({ storage }, columnName) => {
    return storage.get("columns").push(
      new LiveObject({
        name: columnName,
        id: uniqid.time(),
        index: 0,
      })
    );
  }, []);

  const handleNewColumnForm = (ev: FormEvent) => {
    ev.preventDefault();
    const input = (ev.target as HTMLElement).querySelector("input");
    if (input) {
      const columnName = input?.value;
      addColumn(columnName);
      input.value = "";
    }
  };

  // const columns = useStorage((storage) => storage.columns);
  // return JSON.stringify(columns);

  return (
    <form onSubmit={handleNewColumnForm} className="max-w-xs">
      <label className="block">
        <span className="text-gray-600 block">Column name:</span>
        <input type="text" placeholder="new column name" />
      </label>
      <button type="submit" className="mt-2 block w-full">
        Create column
      </button>
    </form>
  );
};

export default NewColumnForm;
