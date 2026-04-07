import { activities } from "@/mocks/activities";
import { topics } from "@/mocks/topics";
import { users } from "@/mocks/users";
import { subscribedTopicIds } from "@/mocks/subscriptions";
import ActivityCard from "@/components/ui/ActivityCard";

/**
 * サブスク画面フィード。
 * currentUser がサブスクライブしているトピックのアクティビティを
 * 時系列降順（最新が先頭）で表示する。
 *
 * 各カードには「誰の・何のトピックの投稿か」を明示する。
 */
const SubscriptionFeed = () => {
  // サブスクライブ中トピックのアクティビティを新しい順に並べる
  const subscribedActivities = activities
    .filter((a) => subscribedTopicIds.includes(a.faceId))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  // O(1) で引けるようにマップ化
  const topicMap = new Map(topics.map((t) => [t.id, t]));
  const userMap = new Map(users.map((u) => [u.id, u]));

  if (subscribedActivities.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-3xl">🔔</p>
        <p className="text-sm text-zinc-400">
          サブスクライブ中のトピックがありません
        </p>
        <p className="text-xs text-zinc-600">
          トピック詳細画面からサブスクライブできます
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {subscribedActivities.map((activity) => {
        const topic = topicMap.get(activity.faceId);
        const user = userMap.get(activity.userId);
        if (!topic || !user) return null;
        return (
          <li key={activity.id}>
            <ActivityCard
              activity={activity}
              user={user}
              topicTitle={`${topic.emoji ?? ""} ${topic.title}`.trim()}
              topicId={topic.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default SubscriptionFeed;
