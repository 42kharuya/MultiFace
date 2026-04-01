import { type User } from "@/types/user";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";

type UserInfoProps = {
  user: User;
  topicCount: number;
  activityCount: number;
};

const UserInfo = ({ user, topicCount, activityCount }: UserInfoProps) => {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-8">
      {/* アバター */}
      <Avatar src={user.avatarUrl} alt={user.name} size="lg" className="ring-2 ring-violet-500/60" />

      {/* 名前 + バッジ */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-zinc-100">{user.name}</span>
        {user.badge && <Badge emoji={user.badge} />}
      </div>

      {/* 統計 */}
      <div className="flex items-center gap-6 text-sm text-zinc-400">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-lg font-semibold text-zinc-100">{topicCount}</span>
          <span>トピック</span>
        </div>
        <div className="w-px h-8 bg-zinc-700" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-lg font-semibold text-zinc-100">{activityCount}</span>
          <span>アクティビティ</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
