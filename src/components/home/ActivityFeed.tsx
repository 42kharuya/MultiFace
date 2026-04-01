import { activities } from "@/mocks/activities";
import { topics } from "@/mocks/topics";
import { currentUser } from "@/mocks/users";
import ActivityCard from "./ActivityCard";

/**
 * ホームフィード。
 * currentUser のアクティビティを時系列降順（最新が先頭）で表示する。
 */
const ActivityFeed = () => {
  // currentUser のアクティビティを新しい順に並べる
  const myActivities = activities
    .filter((a) => a.userId === currentUser.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  // トピックを O(1) で引けるようにマップ化
  const topicMap = new Map(topics.map((t) => [t.id, t]));

  if (myActivities.length === 0) {
    return (
      <p className="text-center text-sm text-zinc-500 py-16">
        アクティビティがありません
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {myActivities.map((activity) => {
        const topic = topicMap.get(activity.topicId);
        if (!topic) return null;
        return (
          <li key={activity.id}>
            <ActivityCard
              activity={activity}
              topic={topic}
              user={currentUser}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ActivityFeed;
