import { type Face } from "@/types/face";
import { activityRepository } from "@/repositories/activity-repository";
import { userRepository } from "@/repositories/user-repository";
import UIActivityCard from "@/components/ui/ActivityCard";

type FaceActivityFeedProps = {
  face: Face;
};

/**
 * 指定フェイスに属するアクティビティを時系列降順で表示するフィード。
 */
const FaceActivityFeed = ({ face }: FaceActivityFeedProps) => {
  // 該当フェイスのアクティビティを取得（Repository 経由・降順済み）
  const faceActivities = activityRepository.listByFaceId(face.id);

  // ユーザーを O(1) で引けるようにマップ化
  const allUsers = userRepository.listAll();
  const userMap = new Map(allUsers.map((u) => [u.id, u]));
  const faceTitle = [face.emoji, face.name].filter(Boolean).join(" ");

  if (faceActivities.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-zinc-500">
        アクティビティがありません
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {faceActivities.map((activity) => {
        const user = userMap.get(activity.userId);
        if (!user) return null;
        return (
          <li key={activity.id}>
            <UIActivityCard
              activity={activity}
              user={user}
              topicTitle={faceTitle}
              topicId={face.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default FaceActivityFeed;
