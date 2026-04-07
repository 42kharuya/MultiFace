import { activities } from "@/mocks/activities";
import { topics } from "@/mocks/topics";
import { users } from "@/mocks/users";
import ActivityCard from "./ActivityCard";

/**
 * タイムラインフィード。
 * 全ユーザーのアクティビティを createdAt 降順（最新が先頭）で表示する。
 */
const TimelineFeed = () => {
  // 全アクティビティを新しい順に並べる
  const sortedActivities = [...activities].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // トピック・ユーザーを O(1) で引けるようにマップ化
  const topicMap = new Map(topics.map((t) => [t.id, t]));
  const userMap = new Map(users.map((u) => [u.id, u]));

  if (sortedActivities.length === 0) {
    return (
      <p className="text-center text-sm text-zinc-500 py-16">
        アクティビティがありません
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {sortedActivities.map((activity) => {
        const topic = topicMap.get(activity.faceId);
        const user = userMap.get(activity.userId);
        if (!topic || !user) return null;
        return (
          <li key={activity.id}>
            <ActivityCard activity={activity} topic={topic} user={user} />
          </li>
        );
      })}
    </ul>
  );
};

export default TimelineFeed;
