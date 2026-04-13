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
  /** クリック時のコールバック（DetailPanel 連携用） */
  onClick?: () => void;
};

/**
 * ホーム画面用の ActivityCard。
 * ui/ActivityCard にフェイス情報を解決して渡すラッパー。
 */
const ActivityCard = ({ activity, face, user, priority = false, onClick }: Props) => {
  const faceTitle = [face.emoji, face.name].filter(Boolean).join(" ");
  return (
    <UIActivityCard
      activity={activity}
      user={user}
      faceTitle={faceTitle}
      faceId={face.id}
      priority={priority}
      onClick={onClick}
    />
  );
};

export default ActivityCard;
