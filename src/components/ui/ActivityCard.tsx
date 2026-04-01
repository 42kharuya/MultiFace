"use client";

import { useState } from "react";
import Image from "next/image";
import { type Activity } from "@/types/activity";
import { type User } from "@/types/user";
import Avatar from "./Avatar";
import Badge from "./Badge";
import TopicChip from "./TopicChip";
import { cn } from "@/lib/utils";

type ActivityCardProps = {
  activity: Activity;
  user: User;
  topicTitle: string;
  /** トピックチップの色決定に使用 */
  topicId: string;
  className?: string;
};

const COLLAPSE_THRESHOLD = 200;

/** ISO 8601 文字列を「N分前」「N時間前」「N日前」などに変換 */
const formatRelativeTime = (isoString: string): string => {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return "たった今";
  if (diffMin < 60) return `${diffMin}分前`;
  if (diffHour < 24) return `${diffHour}時間前`;
  if (diffDay < 30) return `${diffDay}日前`;

  // それ以外は日付表示
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ActivityCard = ({
  activity,
  user,
  topicTitle,
  topicId,
  className,
}: ActivityCardProps) => {
  const isLong = activity.body.length > COLLAPSE_THRESHOLD;
  const [expanded, setExpanded] = useState(false);

  const displayBody =
    isLong && !expanded
      ? activity.body.slice(0, COLLAPSE_THRESHOLD) + "…"
      : activity.body;

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-2xl bg-zinc-800/60 p-4 transition-colors hover:bg-zinc-800",
        className,
      )}
    >
      {/* ヘッダー: アバター・名前・バッジ・トピック・日時 */}
      <div className="flex items-start gap-3">
        <Avatar src={user.avatarUrl} alt={user.name} size="md" />
        <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-100">
            <span className="truncate">{user.name}</span>
            {user.badge && <Badge emoji={user.badge} />}
          </div>
          <div className="flex items-center gap-2">
            <TopicChip title={topicTitle} topicId={topicId} />
            <time
              dateTime={activity.createdAt}
              className="text-xs text-zinc-500"
            >
              {formatRelativeTime(activity.createdAt)}
            </time>
          </div>
        </div>
      </div>

      {/* 本文 */}
      <div className="text-sm leading-relaxed text-zinc-200 whitespace-pre-wrap">
        {displayBody}
      </div>

      {/* 「もっと見る」 */}
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="self-start text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
        >
          {expanded ? "折りたたむ" : "もっと見る"}
        </button>
      )}

      {/* 画像 */}
      {activity.imageUrls && activity.imageUrls.length > 0 && (
        <div
          className={cn(
            "grid gap-1.5 overflow-hidden rounded-xl",
            activity.imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2",
          )}
        >
          {activity.imageUrls.map((url, i) => (
            <div key={i} className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={url}
                alt={`画像 ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 384px) 100vw, 192px"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default ActivityCard;
