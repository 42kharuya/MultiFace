import { notFound } from "next/navigation";
import Link from "next/link";
import { topics } from "@/mocks/topics";
import TopicHeader from "@/components/topic/TopicHeader";
import TopicActivityFeed from "@/components/topic/TopicActivityFeed";

type Props = {
  params: Promise<{ topicId: string }>;
};

const TopicDetailPage = async ({ params }: Props) => {
  const { topicId } = await params;
  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* スティッキーヘッダー */}
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center justify-center rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          aria-label="ホームに戻る"
        >
          {/* 左矢印アイコン */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <h2 className="text-base font-bold text-zinc-100 truncate">
          {topic.emoji ? `${topic.emoji} ${topic.title}` : topic.title}
        </h2>
      </header>

      <main>
        {/* トピックヘッダー（絵文字・タイトル・説明・サブスクボタン） */}
        <div className="border-b border-zinc-800">
          <TopicHeader topic={topic} />
        </div>

        {/* アクティビティ一覧 */}
        <section className="px-4 py-4">
          <TopicActivityFeed topic={topic} />
        </section>
      </main>
    </div>
  );
};

export default TopicDetailPage;
