import { currentUser } from "@/mocks/users";
import { topics } from "@/mocks/topics";
import { activities } from "@/mocks/activities";
import UserInfo from "@/components/profile/UserInfo";
import TopicList from "@/components/profile/TopicList";
import ActivityTileCalendar from "@/components/profile/ActivityTileCalendar";

const ProfilePage = () => {
  // currentUser のトピックとアクティビティのみ抽出
  const myTopics = topics.filter((t) => t.userId === currentUser.id);
  const myActivities = activities.filter((a) => a.userId === currentUser.id);

  return (
    <main className="flex flex-col gap-6 pb-6">
      {/* ユーザー情報 */}
      <UserInfo
        user={currentUser}
        topicCount={myTopics.length}
        activityCount={myActivities.length}
      />

      {/* 振り返りタイル */}
      <ActivityTileCalendar activities={myActivities} />

      {/* トピック一覧 */}
      <TopicList topics={myTopics} />
    </main>
  );
};

export default ProfilePage;
