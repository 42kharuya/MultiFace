import { type Topic } from "@/types/topic";
import { activities } from "@/mocks/activities";
import { users } from "@/mocks/users";
import UIActivityCard from "@/components/ui/ActivityCard";

type TopicActivityFeedProps = {
  topic: Topic;
};

/**
 * 指定トピックに属するアクティビティを時系列降順で表示するフィード。
 */
const TopicActivityFeed = ({ topic }: TopicActivityFeedProps) => {
  // 該当トピックのアクティビティを新しい順に並べる
  const topicActivities = activities
    .filter((a) => a.faceId === topic.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  // ユーザーを O(1) で引けるようにマップ化
  const userMap = new Map(users.map((u) => [u.id, u]));
  const topicTitle = [topic.emoji, topic.title].filter(Boolean).join(" ");

  if (topicActivities.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-zinc-500">
        アクティビティがありません
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {topicActivities.map((activity) => {
        const user = userMap.get(activity.userId);
        if (!user) return null;
        return (
          <li key={activity.id}>
            <UIActivityCard
              activity={activity}
              user={user}
              topicTitle={topicTitle}
              topicId={topic.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TopicActivityFeed;
