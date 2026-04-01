import { type Activity } from "@/types/activity";
import { type Topic } from "@/types/topic";
import { type User } from "@/types/user";
import UIActivityCard from "@/components/ui/ActivityCard";

type Props = {
  activity: Activity;
  topic: Topic;
  user: User;
};

/**
 * ホーム画面用の ActivityCard。
 * ui/ActivityCard にトピック情報を解決して渡すラッパー。
 */
const ActivityCard = ({ activity, topic, user }: Props) => {
  return (
    <UIActivityCard
      activity={activity}
      user={user}
      topicTitle={topic.title}
      topicId={topic.id}
    />
  );
};

export default ActivityCard;
