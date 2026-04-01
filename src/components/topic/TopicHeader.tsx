"use client";

import { useState } from "react";
import { type Topic } from "@/types/topic";
import { cn } from "@/lib/utils";

type TopicHeaderProps = {
  topic: Topic;
};

const TopicHeader = ({ topic }: TopicHeaderProps) => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      {/* アイコン絵文字 + タイトル */}
      <div className="flex flex-col items-center gap-2 text-center">
        {topic.emoji && (
          <span className="text-5xl leading-none" aria-hidden="true">
            {topic.emoji}
          </span>
        )}
        <h1 className="text-2xl font-bold text-zinc-100">{topic.title}</h1>
        {topic.description && (
          <p className="text-sm text-zinc-400 max-w-xs">{topic.description}</p>
        )}
      </div>

      {/* サブスクボタン */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSubscribe}
          className={cn(
            "rounded-full px-6 py-2 text-sm font-semibold transition-colors",
            subscribed
              ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              : "bg-violet-600 text-white hover:bg-violet-500",
          )}
        >
          {subscribed ? "✓ サブスク中" : "サブスクする"}
        </button>
      </div>
    </div>
  );
};

export default TopicHeader;
