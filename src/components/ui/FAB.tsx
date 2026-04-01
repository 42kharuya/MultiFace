"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import PostModal from "@/components/ui/PostModal";

type Props = {
  /** モーダルを開いた時点で選択済みにするトピックID（省略可） */
  defaultTopicId?: string;
};

const FAB = ({ defaultTopicId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label="投稿する"
        className="md:hidden fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-900/50 transition-all duration-200 hover:bg-violet-500 active:scale-95 active:bg-violet-700"
      >
        <Pencil size={22} strokeWidth={2.5} />
      </button>

      <PostModal
        isOpen={isModalOpen}
        onClose={handleClose}
        defaultTopicId={defaultTopicId}
      />
    </>
  );
};

export default FAB;
