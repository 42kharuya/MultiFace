import { type Activity } from "@/types/activity";
import { type User } from "@/types/user";
import { type Topic } from "@/types/topic";
import ActivityCard from "@/components/ui/ActivityCard";

type SearchResultItem = {
  activity: Activity;
  user: User;
  topic: Topic;
};

type SearchResultsProps = {
  query: string;
  results: SearchResultItem[];
};

/**
 * 検索結果一覧。
 * - クエリ未入力: 検索促進メッセージを表示
 * - クエリあり・0件: 該当なしメッセージを表示
 * - クエリあり・N件: ヒット件数 + ActivityCard の一覧を表示
 */
const SearchResults = ({ query, results }: SearchResultsProps) => {
  if (!query) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-3xl">🔍</p>
        <p className="text-sm text-zinc-400">
          キーワードを入力して検索してください
        </p>
        <p className="text-xs text-zinc-600">
          アクティビティの本文をスコープに応じて絞り込みます
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-3xl">😶</p>
        <p className="text-sm text-zinc-400">
          「{query}」に一致するアクティビティが見つかりませんでした
        </p>
        <p className="text-xs text-zinc-600">
          別のキーワードやスコープで試してみてください
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* ヒット件数 */}
      <p className="text-xs text-zinc-500">
        <span className="font-semibold text-violet-400">{results.length}</span>
        &nbsp;件ヒット
      </p>

      {/* 結果一覧 */}
      <ul className="flex flex-col gap-3">
        {results.map(({ activity, user, topic }) => (
          <li key={activity.id}>
            <ActivityCard
              activity={activity}
              user={user}
              topicTitle={`${topic.emoji ?? ""} ${topic.title}`.trim()}
              topicId={topic.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
