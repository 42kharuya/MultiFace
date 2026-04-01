"use client";

import { useState, useMemo } from "react";
import { activities } from "@/mocks/activities";
import { topics } from "@/mocks/topics";
import { users, currentUser } from "@/mocks/users";
import { subscribedTopicIds } from "@/mocks/subscriptions";
import SearchBar from "@/components/search/SearchBar";
import SearchScopeSelector, {
  type SearchScope,
} from "@/components/search/SearchScopeSelector";
import SearchResults from "@/components/search/SearchResults";

// O(1) 参照用マップ
const topicMap = new Map(topics.map((t) => [t.id, t]));
const userMap = new Map(users.map((u) => [u.id, u]));

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<SearchScope>("all");

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const lowerQuery = trimmed.toLowerCase();

    // ① スコープでフィルタ
    const scopedActivities = activities.filter((a) => {
      if (scope === "mine") return a.userId === currentUser.id;
      if (scope === "subscribed") return subscribedTopicIds.includes(a.topicId);
      return true; // "all"
    });

    // ② クエリで部分一致フィルタ（本文を対象）
    const matched = scopedActivities.filter((a) =>
      a.body.toLowerCase().includes(lowerQuery),
    );

    // ③ 新しい順にソート
    matched.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    // ④ user / topic を解決して返す
    return matched.flatMap((activity) => {
      const user = userMap.get(activity.userId);
      const topic = topicMap.get(activity.topicId);
      if (!user || !topic) return [];
      return [{ activity, user, topic }];
    });
  }, [query, scope]);

  return (
    <div className="flex flex-col">
      {/* スティッキーヘッダー */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm">
        <h1 className="mb-3 text-lg font-bold text-zinc-100">検索</h1>
        <div className="flex flex-col gap-2">
          <SearchBar value={query} onChange={setQuery} />
          <SearchScopeSelector scope={scope} onScopeChange={setScope} />
        </div>
      </header>

      <main className="px-4 py-4">
        <SearchResults query={query.trim()} results={results} />
      </main>
    </div>
  );
}
