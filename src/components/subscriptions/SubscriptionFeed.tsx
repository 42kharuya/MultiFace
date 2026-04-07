import Link from "next/link";
import { activityRepository } from "@/repositories/activity-repository";
import { faceRepository } from "@/repositories/face-repository";
import { userRepository } from "@/repositories/user-repository";
import { subscriptionRepository } from "@/repositories/subscription-repository";
import ActivityCard from "@/components/ui/ActivityCard";

/**
 * サブスク画面フィード。
 * currentUser がサブスクライブしているフェイスのアクティビティを
 * 時系列降順（最新が先頭）で表示する。
 *
 * 各カードには「誰の・何のフェイスの投稿か」を明示する。
 */
const SubscriptionFeed = () => {
  // サブスクライブ中フェイスID一覧をリポジトリ経由で取得
  const subscribedFaceIds = subscriptionRepository.getSubscribedFaceIds();

  // サブスクライブ中フェイスのアクティビティを新しい順に取得
  const subscribedActivities = activityRepository.listByFaceIds(subscribedFaceIds);

  // O(1) で引けるようにマップ化
  const faceMap = new Map(
    subscribedFaceIds
      .map((id) => [id, faceRepository.findById(id)] as const)
      .filter((entry): entry is [string, NonNullable<ReturnType<typeof faceRepository.findById>>] =>
        entry[1] !== undefined
      )
  );
  const userMap = new Map(
    userRepository.listAll().map((u) => [u.id, u])
  );

  if (subscribedActivities.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-4xl">🔔</p>
        <p className="text-sm text-zinc-400">
          まだサブスクしているフェイスがありません
        </p>
        <Link
          href="/search"
          className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-500 active:bg-violet-700"
        >
          検索してフェイスを探す
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {subscribedActivities.map((activity) => {
        const face = faceMap.get(activity.faceId);
        const user = userMap.get(activity.userId);
        if (!face || !user) return null;
        return (
          <li key={activity.id}>
            <ActivityCard
              activity={activity}
              user={user}
              topicTitle={`${face.emoji ?? ""} ${face.name}`.trim()}
              topicId={face.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default SubscriptionFeed;
