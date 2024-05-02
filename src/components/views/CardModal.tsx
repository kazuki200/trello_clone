"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { BoardContext, BoardContextProps } from "../BoardContext";
import { useMutation, useStorage } from "@/app/liveblocks";
import { shallow } from "@liveblocks/client";

const CardModal = () => {
  const router = useRouter();
  const params = useParams();
  const { setOpenCard } = useContext<BoardContextProps>(BoardContext);
   const [editMode, setEditMode] = useState(false);


  const card = useStorage((root) => {
    return root.cards.find((c) => c.id === params.cardId);
  }, shallow);

  const updateCard = useMutation(({ storage }, cardId, updateData) => {
    const cards = storage.get("cards").map((c) => c.toObject());
    const index = cards.findIndex((c) => c.id === cardId);
    const card = storage.get("cards").get(index);
    for (let updateKey of updateData) {
      card?.set(updateKey, updateData[updateKey]);
    }
  }, []);

  useEffect(() => {
    if (params.cardId && setOpenCard) {
      setOpenCard(params.cardId.toString());
    }
  }, [params]);

  function handleBackdropClick() {
    router.back();
  }

  function handleNameChangeSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector("input");
    if (input) {
      const newName = input.value;
      updateCard(params.cardId, { name: newName });
      setEditMode(false);
    }
  }

  return (
    <div onClick={handleBackdropClick} className="fixed inset-0 bg-black/70">
      <div
        onClick={(ev) => ev.stopPropagation()}
        className="bg-white p-4 mt-8 max-w-xs mx-auto rounded-md"
      >
        {card?.name}
      </div>
    </div>
  );
};

export default CardModal;
