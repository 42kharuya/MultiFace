import SubscriptionFeed from "@/components/subscriptions/SubscriptionFeed";
import { subscribedTopicIds } from "@/mocks/subscriptions";

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col">
      {/* スティッキーヘッダー */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-zinc-100">サブスク</h1>
          <span className="text-xs text-zinc-500">
            {subscribedTopicIds.length} トピックをサブスク中
          </span>
        </div>
      </header>

      <main className="px-4 py-4">
        <SubscriptionFeed />
      </main>
    </div>
  );
}
