"use client";

import Image from "next/image";
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
    <div className="flex flex-col">
      {topic.imageUrl ? (
        /* カバー画像あり: 画像 + グラデーションオーバーレイ */
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={topic.imageUrl}
            alt={topic.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          {/* コンテンツ（画像上に重ねる） */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-4 py-6 text-center">
            {topic.emoji && (
              <span className="text-5xl leading-none" aria-hidden="true">
                {topic.emoji}
              </span>
            )}
            <h1 className="text-2xl font-bold text-white">{topic.title}</h1>
            {topic.description && (
              <p className="max-w-xs text-sm text-white/80">{topic.description}</p>
            )}
            <button
              type="button"
              onClick={handleSubscribe}
              className={cn(
                "mt-1 rounded-full px-6 py-2 text-sm font-semibold transition-colors",
                subscribed
                  ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  : "bg-violet-600 text-white hover:bg-violet-500",
              )}
            >
              {subscribed ? "✓ サブスク中" : "サブスクする"}
            </button>
          </div>
        </div>
      ) : (
        /* カバー画像なし: 従来どおり */
        <div className="flex flex-col gap-4 px-4 py-6">
          <div className="flex flex-col items-center gap-2 text-center">
            {topic.emoji && (
              <span className="text-5xl leading-none" aria-hidden="true">
                {topic.emoji}
              </span>
            )}
            <h1 className="text-2xl font-bold text-zinc-100">{topic.title}</h1>
            {topic.description && (
              <p className="max-w-xs text-sm text-zinc-400">{topic.description}</p>
            )}
          </div>
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
      )}
    </div>
  );
};

export default TopicHeader;
