import { type Activity } from "@/types/activity";
import { type Face } from "@/types/face";
import { type User } from "@/types/user";
import UIActivityCard from "@/components/ui/ActivityCard";

type Props = {
  activity: Activity;
  face: Face;
  user: User;
  /** true のとき最初の画像を優先読み込み（LCP 対策） */
  priority?: boolean;
};

/**
 * ホーム画面用の ActivityCard。
 * ui/ActivityCard にフェイス情報を解決して渡すラッパー。
 */
const ActivityCard = ({ activity, face, user, priority = false }: Props) => {
  const faceTitle = [face.emoji, face.name].filter(Boolean).join(" ");
  return (
    <UIActivityCard
      activity={activity}
      user={user}
      faceTitle={faceTitle}
      faceId={face.id}
      priority={priority}
    />
  );
};

export default ActivityCard;
