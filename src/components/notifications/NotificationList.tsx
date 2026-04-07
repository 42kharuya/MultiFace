import Avatar from "@/components/ui/Avatar";
import { notificationRepository } from "@/repositories/notification-repository";
import { userRepository } from "@/repositories/user-repository";
import { faceRepository } from "@/repositories/face-repository";
import { activityRepository } from "@/repositories/activity-repository";
import { type Notification } from "@/types/notification";
import { type User } from "@/types/user";

// ─── ヘルパー ──────────────────────────────────────────────────

/** ISO 8601 文字列を「N分前」「N時間前」「N日前」に変換 */
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

  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// ─── 通知アイテム ──────────────────────────────────────────────

type NotificationItemProps = {
  notification: Notification;
  fromUser: User;
  detail: string;
  /** リンク通知の場合のアクティビティ本文スニペット（任意） */
  activitySnippet?: string;
};

const NotificationItem = ({
  notification,
  fromUser,
  detail,
  activitySnippet,
}: NotificationItemProps) => {
  const isLink = notification.type === "link";

  return (
    <li className="flex gap-3 rounded-2xl bg-zinc-800/60 p-4 transition hover:bg-zinc-800">
      {/* アバター */}
      <div className="shrink-0">
        <Avatar src={fromUser.avatarUrl} alt={fromUser.name} size="md" />
      </div>

      {/* 本文 */}
      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">
        {/* アクション行 */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-zinc-200 leading-snug">
            <span className="font-semibold text-zinc-100">{fromUser.name}</span>
            {" さんが "}
            <span className="text-violet-400">{detail}</span>
          </p>
          <span className="shrink-0 text-xs text-zinc-500">
            {formatRelativeTime(notification.createdAt)}
          </span>
        </div>

        {/* リンク通知: アクティビティ本文スニペット */}
        {isLink && activitySnippet && (
          <blockquote className="rounded-lg border-l-2 border-violet-500/60 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-400 line-clamp-2">
            {activitySnippet}
          </blockquote>
        )}

        {/* 通知種別バッジ */}
        <span className="self-start rounded-full bg-zinc-700/60 px-2 py-0.5 text-xs text-zinc-400">
          {isLink ? "🔗 リンク" : "📥 サブスク"}
        </span>
      </div>
    </li>
  );
};

// ─── NotificationList ──────────────────────────────────────────

/**
 * 通知一覧コンポーネント（Server Component）。
 * notificationRepository から全通知を取得し、時系列降順で表示する。
 */
const NotificationList = () => {
  const notifications = notificationRepository.listAll();

  // ユーザー情報をマップ化
  const userMap = new Map(userRepository.listAll().map((u) => [u.id, u]));

  // アクティビティをマップ化（リンク通知のスニペット表示用）
  const activityMap = new Map(
    activityRepository.listAll().map((a) => [a.id, a])
  );

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-4xl">🔔</p>
        <p className="text-sm text-zinc-400">まだ通知はありません</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {notifications.map((notification) => {
        const fromUser = userMap.get(notification.fromUserId);
        if (!fromUser) return null;

        if (notification.type === "link") {
          const activity = activityMap.get(notification.activityId);
          const detail = "あなたの投稿をリンクしました";
          return (
            <NotificationItem
              key={notification.id}
              notification={notification}
              fromUser={fromUser}
              detail={detail}
              activitySnippet={activity?.body}
            />
          );
        }

        // subscribe
        const face = faceRepository.findById(notification.faceId);
        const faceName = face
          ? `${face.emoji ?? ""} ${face.name}`.trim()
          : notification.faceId;
        const detail = `${faceName} をサブスクライブしました`;
        return (
          <NotificationItem
            key={notification.id}
            notification={notification}
            fromUser={fromUser}
            detail={detail}
          />
        );
      })}
    </ul>
  );
};

export default NotificationList;
